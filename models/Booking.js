import mongoose from 'mongoose';

// Booking schema
const bookingSchema = new mongoose.Schema(
  {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    packageName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelersCount: { type: Number, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    specialRequests: { type: String },
    paymentSlip: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "In-Review", "Confirmed", "Rejected", "Canceled"],
      default: "New",
    },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
