import { isAuth } from "../middeleware/isAuth.js";
import express from "express";
import multer from "multer";
import {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/gallery.js";
import authorizeRoles from "../middeleware/roleMiddleware.js";
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


const router = express.Router(); 

// Public routes
router.get("/gallery", getGalleries); // Get all galleries
router.get("/gallery/:id", getGalleryById); // Get gallery by ID

// Admin routes
router.post("/gallery", isAuth, authorizeRoles("admin"), upload.single("image"), createGallery); // Create gallery
router.put("/gallery/:id", isAuth, upload.single("image"), updateGallery); // Update gallery
router.delete("/gallery/:id", isAuth,authorizeRoles("admin"), deleteGallery); // Delete gallery

export default router;
