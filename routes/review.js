import express from "express";
import multer from "multer";
import path from "path";
import { addReview, getReviews, getReviewsByUserId, updateReview, deleteReview } from "../controllers/reviewController.js";
import { isAuth } from "../middeleware/isAuth.js";
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), addReview);
router.get("/", getReviews);
router.get("/user/:userId", getReviewsByUserId);
router.put("/:id", updateReview);
router.delete("/:id", isAuth, deleteReview);

export default router;
