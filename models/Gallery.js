import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String, // store image URL or file path
      required: true,
    },
    title: {
      type: String,
      required: true,
      
    },
    country: {
      type: String,
      required: true,
      
    },
    reorder: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;