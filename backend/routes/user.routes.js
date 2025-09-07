import { Router } from "express";
import { registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointments,cancelAppointment,payment,verifyPayment} from "../controller/user.controller.js";
import verifyUser from "../middleware/authUser.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-profile").get(verifyUser,getProfile)
router.route("/update-profile").post(verifyUser,upload.single('image'),updateProfile)
router.route("/book-appointment").post(verifyUser,bookAppointment);
router.route("/appointments").get(verifyUser,listAppointments);
router.route("/cancel-appointment").post(verifyUser,cancelAppointment);
router.route('/payment').post(verifyUser,payment)
router.route('/verify-payment').post(verifyUser,verifyPayment);
export default router