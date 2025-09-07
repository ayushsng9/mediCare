import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js"
import jwt from "jsonwebtoken"

const changeAvailability = asyncHandler(async(req,res) => {
  const {docId} = req.body;
  const docData = await Doctor.findById(docId).select("-password");
   if (!docData) {
    throw new ApiError(404,"Doctor not found");
  }
  await Doctor.findByIdAndUpdate(docId,{available:!docData.available})
  return res
          .status(200)
          .json(new ApiResponse(200,{},'Availability Changed'))
})

const doctorList = asyncHandler(async(req,res) => {
    const doctors = await Doctor.find({}).select("-password -email");
    if(!doctors)
    {
        throw new ApiError(400,"Doctors not found");
    }
    return res
            .status(200)
            .json(new ApiResponse(200,doctors,"Doctors List"))
})




const loginDoctor = asyncHandler(async(req,res)=>{

  const {email,password} = req.body;

  const doctor = await Doctor.findOne({email})

  if (!doctor) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await doctor.isPasswordCorrect(password);
  if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign({id: doctor._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});
  const options = {
      httpOnly: true, // cookies can be modified only by server
      secure: false,
      sameSite: "lax",    
      }

  return res
    .status(200)
    .cookie("token",token,options)
    .json(
      new ApiResponse(200,{token},"Doctor Login successful")
    );

})




const appointmentDoctor = asyncHandler(async(req,res)=>{
  const docId = req.doctor.id; 
  const appointments = await Appointment.find({docId})
  return res
        .status(200)
        .json(new ApiResponse(200,{appointments},"All appointments fetched"))
})



const completeAppointment = asyncHandler(async(req,res) => {
  const docId = req.doctor.id; 
  const {appointmentId} = req.body;
  const appointmentData = await Appointment.findById(appointmentId)

  if(appointmentData && appointmentData.docId === docId)
  {
    await Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true})
    return res
            .status(200)
            .json(new ApiResponse(200,{},"Appointment completed"))
  }
  else
  {
    throw new ApiError(400,"Failed marking")
  }
})

const cancelAppointment = asyncHandler(async(req,res) => {
  const docId = req.doctor.id; 
  const {appointmentId} = req.body;
  const appointmentData = await Appointment.findById(appointmentId)

  if(appointmentData && appointmentData.docId === docId)
  {
    await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})
    return res
            .status(200)
            .json(new ApiResponse(200,{},"Appointment cancelled"))
  }
  else
  {
    throw new ApiError(400,"cancellation failed")
  }
})

const doctorDashboard = asyncHandler(async(req,res)=>{
    const docId = req.doctor.id;
    const appointments = await Appointment.find({docId})
    let earnings = 0;

    appointments.map((item,index)=>{
      if(item.isCompleted || item.payment){
        earnings += item.amount
      }
    })

    const patients = [];

    appointments.map((item) => {
      if(patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments : appointments.reverse().slice(0,5)
    }

    return res
          .status(200)
          .json(new ApiResponse(200,{dashData},"dashboard data fetched"))

})


const doctorProfile = asyncHandler(async(req,res)=>{
  const docId = req.doctor.id;
  const profileData = await Doctor.findById(docId).select("-password")
  return res
        .status(200)
        .json(new ApiResponse(200,profileData,"Doctor data fetched"))

})



const updateProfileData = asyncHandler(async (req, res) => {
  const docId = req.doctor.id;
  const { fees, address, available } = req.body;

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    docId,
    { fees, address, available },
    { new: true, select: "-password" }
  );

  return res.status(200).json(
    new ApiResponse(200, updatedDoctor, "Doctor data updated")
  );
});



export {changeAvailability,doctorList,loginDoctor,appointmentDoctor,
  completeAppointment,cancelAppointment,doctorDashboard,doctorProfile,updateProfileData};

