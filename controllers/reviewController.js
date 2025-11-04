import path from "path";
import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { review, rating, userName, userId } = req.body;
    if (!review || !rating || !userName || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedRating = Number(rating);

    const newReview = new Review({
      review,
      rating: parsedRating,
      userName,
      userId, 
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "✅ Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("❌ Error fetching user reviews:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating, status } = req.body;
    const updates = {};
    if (review !== undefined) updates.review = review;
    if (rating !== undefined) updates.rating = rating;
    if (status !== undefined) updates.status = status;

    const updated = await Review.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review updated", review: updated });
  } catch (error) {
    console.error("❌ Error updating review:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (
      req.user.userRole !== "admin" &&
      review.userId.toString() !== req.user.userId
    ) {
      console.log("DELETE BLOCKED:", {
        loggedInUser: req.user,
        reviewOwner: review.userId.toString(),
      });
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

