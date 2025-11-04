import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import sendMail from "../middeleware/sendMail.js";
import forgotPasswordTemplate from "../utils/forgotPasswordMail.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // console.log(role)
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Username & Email existence check
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(userRole)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    
    if (newUser) {
      generateToken(newUser._id, newUser.role, res); 
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
     
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
      console.error("Register Error:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }

};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ 
      message: "Invalid email or password" });
    }

    const { password: userPassword, ...userDetails } = user.toObject();
    const token = generateToken(user._id, user.role, res);
    // console.log(token);
    res.status(200).json({
      // user:userDetails,
      token:token,
      role: user.role,
      userid: user._id,
    });
  } catch (error) {
    console.log(`Error in login: ${error}`);
    res.status(500).json({
      message: "Invalid Login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(`Error in logout: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    const resetURL = `${process.env.CLIENT_URL}/reset?id=${user._id}&token=${token}`;
    const message = forgotPasswordTemplate(user.name, resetURL);

    await sendMail(user.email, process.env.SMTP_USER, "Password Reset Request", message);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  const { newpassword, confirmpassword, id, token } = req.body;
  console.log(req.body);

  try {
    if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    // const secret = process.env.JWT_SECRET + user.password;

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const encryptedPassword = await bcrypt.hash(newpassword, 10);
    user.password = encryptedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: 'Something went wrong' });

  }
};
