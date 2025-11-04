import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  details: String,
});

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
});

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { type: String, enum: ["Maldives", "Sri Lanka"], required: true },
    type: { type: String, enum: ["MULTI DAY TOURS", "EXPERIENCES", "DAY TRIPS"], required: true },
    price: { type: Number, required: true },
    currency: { type: String, enum: ["USD", "LKR"], default: "USD" },
    duration: { type: String, required: true },
    maxPeople: { type: Number },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
    description: String,
    highlights: [String],
    itinerary: [itinerarySchema],
    inclusions: [String],
    exclusions: [String],
    images: [imageSchema],
    mainImage: { type: String },
    location: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "Inactive"], default: "Inactive" },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    pricePerText: { type: String, default: "per person" },
  },
  { timestamps: true }
);

packageSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model("Package", packageSchema);
