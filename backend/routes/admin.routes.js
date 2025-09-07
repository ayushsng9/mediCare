import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { addDoctor , login , allDoctors , getDoctor , allAppointments , cancelAppt , adminDashboard} from "../controller/admin.controller.js";
import validate from "../middleware/validate.middleware.js";
import doctorSchema from "../validators/doctor.validator.js"
import verifyAdmin from "../middleware/authAdmin.middleware.js";
import { changeAvailability } from "../controller/doctor.controller.js";
    
const router = Router()

// https://localhost:4000/api/v1/admin/add-doctor
router.route("/add-doctor").post(verifyAdmin,upload.single('image'),validate(doctorSchema),addDoctor)
router.route("/login").post(login)
router.route("/all-doctors").post(verifyAdmin,allDoctors)
router.route("/get-doctor").get(verifyAdmin,getDoctor)
router.route("/change-availability").post(verifyAdmin,changeAvailability)
router.route("/all-appointments").post(verifyAdmin,allAppointments)
router.route("/cancel-appointment").post(verifyAdmin,cancelAppt)
router.route("/dashboard").get(verifyAdmin,adminDashboard)

export default router
