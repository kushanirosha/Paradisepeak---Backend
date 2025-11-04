import mongoose from "mongoose";

const UserSharePhotoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    description: {
     type: String,
      required: true,
      trim: true,
    },
    drivelink: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Please enter a valid URL",
      },
    },
  },
  { timestamps: true }
);

const UserSharePhoto = mongoose.model("PhotoSubmission", UserSharePhotoSchema);

export default UserSharePhoto;
