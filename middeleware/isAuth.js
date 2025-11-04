import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    let accessToken;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    }

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Attach user from DB if exists
    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = {
        userId: user._id.toString(),
        role: user.role,      // normalize role
        userRole: user.role,  // keep original if needed
      };
    } else {
      // Fallback from JWT payload
      req.user = {
        userId: decoded.userId,
        role: decoded.userRole,  // normalize role
        userRole: decoded.userRole,
      };
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Access Denied. Invalid token." });
  }
};
