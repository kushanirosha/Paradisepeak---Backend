import Booking from "../models/Booking.js"
import sendMail from "../middeleware/sendMail.js"
import {
  bookingReceivedTemplate,
  bookingStatusUpdateTemplate,
  bookingConfirmationTemplate,
  adminBookingTemplate,
} from "../utils/bookingMail.js";
import dotenv from "dotenv";

dotenv.config()

export const createBooking = async (req, res) => {
  console.log(req.body)
  try {
    const {
      packageId,
      packageName,
      name,
      email,
      phone,
      travelersCount,
      dateFrom,
      dateTo,
      specialRequests,
    } = req.body;

    if (!packageId || !packageName || !name || !email || !phone || !travelersCount || !dateFrom || !dateTo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paymentSlipUrl = req.file ? `/uploads/paymentSlips/${req.file.filename}` : null;
    console.log('file', paymentSlipUrl)

    const booking = new Booking({
      packageId,
      packageName,
      name,
      email,
      phone,
      travelersCount,
      dateFrom,
      dateTo,
      specialRequests,
      status: "New", // default status
      paymentSlip: paymentSlipUrl,
    });

    await booking.save();

    //  Send email to user
    await sendMail(
      booking.email,
      process.env.SMTP_USER,
      `✅ Your Booking Request Has Been Received - ${booking.packageName}`,
      bookingReceivedTemplate(booking)
    );

    //  Send email to admin
    await sendMail(
      process.env.ADMIN_EMAIL,
      process.env.SMTP_USER,
      `📢 New Booking Received - ${booking.packageName}`,
      adminBookingTemplate(booking)
    );

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// GET /bookings (admin) — list with filters
export const getBookings = async (req, res) => {
  try {
    const { status, email } = req.query; // simple filters

    let filter = {};
    if (status) filter.status = status;
    if (email) filter.email = email;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};
//GET /api/v1/bookings/:id — booking detail (admin)
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

// PATCH /api/v1/bookings/:id/status — update status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update booking in DB
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Send status update email to user
    try {
      const emailBody = bookingStatusUpdateTemplate(booking, status, internalNotes);

      await sendMail(
        booking.email,
        process.env.SMTP_USER,
        `📢 Your Booking Status Updated - ${booking.packageName}`,
        emailBody
      );

      console.log(`📧 Status update email sent to ${booking.email}`);
    } catch (mailError) {
      console.error("Email sending failed:", mailError.message);
      // optional: continue without breaking response
    }

    res.json({ message: "Booking status updated", booking });

  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error: error.message });
  }
};

// POST /api/v1/bookings/send-booking-confirmation
export const sendBookingConfirmation = async (req, res) => {
  try {
    const {
      bookingId,
      customerEmail,
      customerName,
      packageName,
      status,
      dateFrom,
      dateTo,
      travelersCount,
      specialRequests
    } = req.body;

    if (!customerEmail || !customerName || !packageName) {
      return res.status(400).json({ message: "Missing required fields for email confirmation" });
    }

    // ✅ Prepare email body using template
    const emailBody = bookingConfirmationTemplate({
      customerName,
      packageName,
      status,
      dateFrom,
      dateTo,
      travelersCount,
      specialRequests
    });

    // ✅ Send booking confirmation email
    await sendMail(
      customerEmail,
      process.env.SMTP_USER,
      `✅ Booking Confirmation - ${packageName}`,
      emailBody
    );

    res.json({ message: "Booking confirmation email sent successfully" });

  } catch (error) {
    console.error("Email confirmation error:", error);
    res.status(500).json({ message: "Error sending booking confirmation", error: error.message });
  }
};


// GET bookings for a specific user (by email)
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const bookings = await Booking.find({ email });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// PUT /api/v1/bookings/:id

// PUT /api/v1/bookings/:id
export const updateBookingByUser = async (req, res) => {
  try {
    const { travelersCount, dateFrom, dateTo, specialRequests } = req.body;

    // Find the existing booking first
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking was created within 2 days
    const createdAt = new Date(booking.createdAt);
    const now = new Date();
    const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (diffInDays > 2) {
      return res
        .status(403)
        .json({ message: "You can only update bookings within 2 days of creation." });
    }

    // Only update allowed fields
    const updateData = { travelersCount, dateFrom, dateTo, specialRequests };

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
  
};
