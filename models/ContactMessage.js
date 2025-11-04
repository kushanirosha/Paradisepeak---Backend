import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false, // optional
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    handled: {
      type: Boolean,
      default: false,
    },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId, // reference to User
      ref: "Admin",
      required: false,
    },
    handledAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
