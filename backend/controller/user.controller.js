import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerUserSchema , loginUserSchema , updateProfileSchema} from "../validators/user.validator.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../config/cloudinary.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import Razorpay from "razorpay"



const registerUser = asyncHandler(async (req, res) => {
  // validate request with Joi
  const { error, value } = registerUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new ApiError(
      400,
      "Validation Failed",
      error.details.map((err) => err.message)
    );
  }

  const { email } = value;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  const user = new User(value);
  await user.save();

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
  const createdUser = await User.findById(user._id).select("-password -image");
  const options = {
      httpOnly: true, // cookies can be modified only by server
      secure: false,
      sameSite: "lax",    
      }

  return res
    .status(201)
    .cookie("token",token,options)
    .json(
      new ApiResponse(
        201,
        {user:createdUser},
        "User registered successfully"
      )
    );
});




const loginUser = asyncHandler(async (req, res) => {
  // validate request with Joi
  const { error, value } = loginUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    throw new ApiError(
      400,
      "Validation Failed",
      error.details.map((err) => err.message)
    );
  }

  const { email, password } = value;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // check password
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  // generate JWT
  const token = jwt.sign({ id: user._id, email: user.email },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});
  const options = {
      httpOnly: true, // cookies can be modified only by server
      secure: false,
      sameSite: "lax",    
      }
  return res
    .status(200)
    .cookie("token",token,options)
    .json(
      new ApiResponse(
        200,
        {
          id: user._id,
          name: user.name,
          token:token,
          email: user.email
        },
        "Login successful"
      )
    );
});





const getProfile = asyncHandler(async(req,res)=>{
  const userId = req.user.id;
  const userData = await User.findById(userId).select('-password');
  return res
  .status(200)
  .json(new ApiResponse(200,userData,"User profile fetched successfully"));

})




const updateProfile = asyncHandler(async (req, res) => {
  const { error, value } = updateProfileSchema.validate(req.body);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
  
  const userId = req.user.id;
  const {name, phone, address, dob, gender } = value;
  const imageLocalPath = req.file?.path;

  const updateData = {};

  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (dob) updateData.dob = dob;
  if (gender) updateData.gender = gender;

  if (address) {
    try {
      updateData.address = address;
    } catch (err) {
      throw new ApiError(400, "Invalid address format (must be JSON)");
    }
  }

  if (imageLocalPath) {
    const image = await uploadOnCloudinary(imageLocalPath);
    updateData.image = image.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

  res.status(200).json(
    new ApiResponse(200,updatedUser,"Profile updated successfully")
  );
});




const bookAppointment = asyncHandler(async (req, res) => {
  const {docId, slotDate, slotTime } = req.body;
  const userId = req.user.id; 
  const docData = await Doctor.findById(docId).select("-password");

  if (!docData) {
    return res.status(404).json(new ApiResponse(404, {}, "Doctor not found"));
  }

  if (!docData.available) {
    return res.status(400).json(
      new ApiResponse(400, {}, "Doctor not Available")
    );
  }
  const slotsBooked = docData.slotsBooked || {};

  // check for slot availability
  if (slotsBooked[slotDate]) {
    if (slotsBooked[slotDate].includes(slotTime)) {
      return res.status(400).json(
        new ApiResponse(400, {}, "Slot not Available")
      );
    } else {
      slotsBooked[slotDate].push(slotTime);
    }
  } else {
    slotsBooked[slotDate] = [slotTime];
  }

  const userData = await User.findById(userId).select("-password");
  if (!userData) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  // Convert docData to plain object before removing properties
  const doctorInfo = docData.toObject();
  delete doctorInfo.slotsBooked;

  const data = {
    userId,
    docId,
    userData,
    docData: doctorInfo,
    amount: docData.fees,
    slotTime,
    slotDate,
    date: new Date(),
  };

  const newAppointment = new Appointment(data);
  await newAppointment.save();

  // update new slots data in Doctor
  await Doctor.findByIdAndUpdate(docId, { slotsBooked });

  return res.status(200).json(
    new ApiResponse(200, newAppointment, "Appointment Booked")
  );
});



const listAppointments = asyncHandler(async(req,res)=>{
  const userId = req.user.id;
  const appointments = await Appointment.find({userId});
  return res
        .status(200)
        .json(new ApiResponse(200,appointments,"Appointments fetched"));
})



const cancelAppointment = asyncHandler(async(req,res) => {

  const userId = req.user.id;
  const {appointmentId} = req.body;
  const appointmentData = await Appointment.findById(appointmentId);

  if (appointmentData.userId.toString() !== userId.toString()) {
    return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized action"));
}


  await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true});


  // release doctor slot

  const {docId,slotDate,slotTime} = appointmentData;

  const docData = await Doctor.findById(docId);

  const slots_booked = docData.slotsBooked

  slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

  await Doctor.findByIdAndUpdate(docId,{slotsBooked:slots_booked});

  return res
        .status(200)
        .json(new ApiResponse(200,{},"Appointment Cancelled"));

})

  const razorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// Payment using razorPay

  const payment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;
  const appointmentData = await Appointment.findById(appointmentId);

  if (!appointmentData || appointmentData.cancelled) {
    return res.status(404).json(new ApiResponse(404, {}, "Appointment cancelled or not found"));
  }

  const options = {
    amount: appointmentData.amount * 100, // amount in paise
    currency: process.env.CURRENCY || "INR",
    receipt: appointmentId,
  };

  const order = await razorPay.orders.create(options);

  return res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
});


// Verify Payment

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id } = req.body;
  const orderInfo = await razorPay.orders.fetch(razorpay_order_id);

  if (orderInfo.status === "paid") {
    await Appointment.findByIdAndUpdate(orderInfo.receipt, { payment: true });
    return res.status(200).json(new ApiResponse(200, {}, "Payment Successful"));
  } else {
    return res.status(400).json(new ApiResponse(400, {}, "Payment Failed"));
  }
});




export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointments,cancelAppointment,payment,verifyPayment};