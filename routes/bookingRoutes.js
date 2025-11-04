import express from "express";
import multer from "multer";

import {
    createBooking,
    getBookings,
    getBookingById,
    updateBookingStatus,
    sendBookingConfirmation,
    getBookingsByEmail,
    updateBookingByUser,
} from "../controllers/bookingController.js";

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/paymentSlips"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

//public route for  creating booking
router.post("/", upload.single("paymentSlip"), createBooking);

//admin routes
//want to do
router.get("/", getBookings);
router.get("/:id",getBookingById);
router.patch("/:id/status",updateBookingStatus);
router.post("/send-booking-confirmation", sendBookingConfirmation); 
router.get("/user/:email",getBookingsByEmail);
router.put("/:id",updateBookingByUser);


export default router;