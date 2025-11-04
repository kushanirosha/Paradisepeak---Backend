import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",   
    // required: true,
  }
 },
  { timestamps: true }
  );
  
const User = mongoose.model("User", userSchema);

export default User;