import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  unsubToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifiedAt: {
    type: Date,
  },
  unsubscribedAt: {
    type: Date,
  },
});

// Optional: update timestamps automatically
subscriberSchema.pre("save", function (next) {
  if (this.isModified("verified") && this.verified && !this.verifiedAt) {
    this.verifiedAt = new Date();
  }
  next();
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
