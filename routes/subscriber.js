import express from "express";
import {
  createSubscriber,
  listSubscribers,
  deleteSubscriber,
} from "../controllers/subscriberController.js";

const router = express.Router();

// Add a new subscriber (no verification)
router.post("/subscribers", createSubscriber);

// List all subscribers
router.get("/subscribers", listSubscribers);

// Delete a subscriber by ID
router.delete("/subscribers/:id", deleteSubscriber);

export default router;
