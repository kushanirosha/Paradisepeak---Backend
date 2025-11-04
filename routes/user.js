import express from "express";
import { registerUser,login,logout,forgotPassword,resetPassword,getUserById} from "../controllers/authController.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.get("/user/:id", getUserById);
export default router;