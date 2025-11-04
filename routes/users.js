import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// DELETE user by ID
router.delete("/:id", deleteUser);

export default router;
