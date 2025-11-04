import Package from "../models/Package.js";
import multer from "multer";
import path from "path";

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) cb(null, true);
  else cb(new Error("Only image files are allowed"));
};

// Multer instance with .fields
export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 5 }
]);

// GET /packages
export const getPackages = async (req, res) => {
  try {
    const { category, type, q, minPrice, maxPrice, sort, status, featured } = req.query;
    let filter = {};

    if (category && category !== "All") filter.category = category;
    if (type && type !== "All") filter.type = type;
    if (status) filter.status = status;
    if (featured === "true") filter.featured = true;
    if (q) filter.title = { $regex: q, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const packages = await Package.find(filter).sort(sort || "-createdAt");
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /packages/:slug
export const getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug, status: "Active" });
    if (!pkg) return res.status(404).json({ error: "Package not found or not available" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /packages
export const createPackage = async (req, res) => {
  try {
    const packageData = { ...req.body };

    // Main image
    if (req.files?.mainImage) {
      packageData.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
    }

    // Additional images
    if (req.files?.images) {
      packageData.images = req.files.images.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: `${packageData.title || "Package"} image`
      }));
    }

    ["inclusions", "exclusions", "highlights"].forEach(field => {
      if (typeof packageData[field] === "string") {
        packageData[field] = packageData[field].split(",").map(item => item.trim());
      }
    });

    const pkg = await Package.create(packageData);
    res.status(201).json(pkg);
  } catch (err) {
    if (err.code === 11000) res.status(400).json({ error: "Package with this title already exists" });
    else res.status(500).json({ error: err.message });
  }
};

// PUT /packages/:id
export const updatePackage = async (req, res) => {
  try {
    const packageData = { ...req.body };

    if (req.files?.mainImage) {
      packageData.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
    }
    if (req.files?.images) {
      packageData.images = req.files.images.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: `${packageData.title || "Package"} image`
      }));
    }

    ["inclusions", "exclusions", "highlights"].forEach(field => {
      if (typeof packageData[field] === "string") {
        packageData[field] = packageData[field].split(",").map(item => item.trim());
      }
    });

    const pkg = await Package.findByIdAndUpdate(req.params.id, packageData, { new: true });
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /packages/:id
export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /packages/:id/toggle-status
export const togglePackageStatus = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    pkg.status = pkg.status === "Active" ? "Inactive" : "Active";
    await pkg.save();
    res.json({ message: `Package status changed to ${pkg.status}`, package: pkg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
