import dotenv from "dotenv";
import express from "express";
import connectMongoDB from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import routes at the top
import userRoutes from "./routes/user.js";
import reviewRoutes from "./routes/review.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contact from "./routes/contact.js"

import packageroutes from "./routes/packages.js";
import galleryRoutes from "./routes/gallery.js";

import subscriberRoutes from "./routes/subscriber.js";
import photosubmission from "./routes/photosubmission.js";
import usersRoutes from "./routes/users.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5005;

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/bookings",bookingRoutes);
app.use("/api/v1", contact);
app.use("/api/v1", packageroutes);
app.use("/api/v1", galleryRoutes);
app.use("/api/v1", subscriberRoutes);
app.use("/api/v1", photosubmission);
app.use("/api/v1/users", usersRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  connectMongoDB();
});
