import express from "express";
import { createPhotoSubmission, getPhotoSubmission,getAllPhotoSubmission } from "../controllers/userPhotoSubmissionController.js";

const router = express.Router();


router.post("/photos", createPhotoSubmission);
router.get("/photos/:userId", getPhotoSubmission);
router.get("/photos", getAllPhotoSubmission);

export default router;