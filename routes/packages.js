import express from "express";
import {
  getPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageStatus,
  uploadMultiple,
} from "../controllers/packageController.js";
import { isAuth } from "../middeleware/isAuth.js";
import authorizeRoles from "../middeleware/roleMiddleware.js";

const router = express.Router();

router.get("/packages", getPackages);
router.get("/packages/:slug", getPackageBySlug);

// Admin routes
router.post("/packages", isAuth, authorizeRoles("admin"), uploadMultiple, createPackage);
router.put("/packages/:id", isAuth, authorizeRoles("admin"), uploadMultiple, updatePackage);
router.patch("/packages/:id/toggle-status", isAuth, togglePackageStatus);
router.delete("/packages/:id", isAuth, authorizeRoles("admin"), deletePackage);

export default router;
