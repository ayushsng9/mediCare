import { Router } from "express";
import { doctorList,loginDoctor,appointmentDoctor,completeAppointment,cancelAppointment,doctorDashboard,
    doctorProfile,updateProfileData
} from "../controller/doctor.controller.js";
import verifyDoctor from "../middleware/authDoctor.middleware.js";

const router = Router();

router.route("/list").get(doctorList)
router.route("/login").post(loginDoctor)
router.route("/appointments").get(verifyDoctor,appointmentDoctor);
router.route("/complete-appointment").post(verifyDoctor,completeAppointment);
router.route("/cancel-appointment").post(verifyDoctor,cancelAppointment);
router.route("/dashboard").get(verifyDoctor,doctorDashboard);
router.route("/profile").get(verifyDoctor,doctorProfile);
router.route("/update-profile").post(verifyDoctor,updateProfileData);

export default router