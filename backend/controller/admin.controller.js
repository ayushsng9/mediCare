import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import Appointment from "../models/appointment.model.js";

const addDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
  const imageLocalPath = req.file?.path;

  if(!imageLocalPath){
    throw new ApiError(400,"Image file is required")
  }

  const imageUrl = await uploadOnCloudinary(imageLocalPath);

  if(!imageUrl)
  {
    throw new ApiError(400,"Image file upload failed")
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    fees,
    address : JSON.parse(address),
    image: imageUrl.secure_url,
    date: Date.now(),
  });

  const createdDoctor = await Doctor.findById(doctor._id).select("-password");
  if (!createdDoctor) {
    throw new ApiError(500, "Something went wrong after creating Doctor");
  }

  return res.status(201).json(
    new ApiResponse(201, createdDoctor, "Doctor created successfully")
  );
});


const login = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
      throw new ApiError(400,"Both fields are required")
    }

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
    {
      const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY})
      const options = {
        httpOnly: true, // cookies can be modified only by server
        secure: false,
        sameSite: "lax",    
      }
      return res
            .status(200)
            .cookie("token",token,options)
            .json(new ApiResponse(200,{token},"Admin logged in Successfully"))
    }

    else
    {
      throw new ApiError(401,"Invalid credentials")
    }
})

const getDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doctor = await Doctor.findById(id).select("-password");
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor fetched successfully"));
});


const allDoctors = asyncHandler(async(req,res) => {
    const doctors = await Doctor.find({}).select("-password")
    if(!doctors)
    {
      throw new ApiError(404,"Doctors not found");
    }
    return res
          .status(200)
          .json(new ApiResponse(200,{doctors},"Fetched all doctors"))
})

const allAppointments = asyncHandler(async(req,res) => {
  const appointments = await Appointment.find({});
  return res.status(200).json(new ApiResponse(200,{appointments},"All appointments fetched"))
})

const cancelAppt = asyncHandler(async(req,res) => {

  const {appointmentId} = req.body;
  const appointmentData = await Appointment.findById(appointmentId);

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

const adminDashboard = asyncHandler(async(req,res) => {
  const doctors = await Doctor.find({});
  const users = await User.find({});
  const appointments = await Appointment.find({});

  const dashData = {
    doctors: doctors.length,
    appointments : appointments.length,
    patients : users.length,
    latestAppointments : appointments.reverse().slice(0,5)
  }
  
  return res
        .status(200)
        .json(new ApiResponse(200,{dashData},"Data fetched"))
})

export {addDoctor,login,allDoctors,getDoctor,allAppointments,cancelAppt,adminDashboard};
