import Gallery from "../models/Gallery.js";
import fs from "fs";
import path from "path";

// Create a new gallery item
export const createGallery = async (req, res) => {
  try {
    const { title, country, reorder } = req.body;

    if (!title || !country || !reorder || !req.file) {
      return res.status(400).json({
        message: "Please send all required fields: title, country, reorder, image",
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newGallery = { title, country, reorder, image: imagePath };
    const savedGallery = await Gallery.create(newGallery);

    return res.status(201).json(savedGallery);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get all gallery items
export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({}).sort({ reorder: 1 });

    return res.status(200).json({
      count: galleries.length,
      data: galleries,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get one gallery item by ID
export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    return res.status(200).json(gallery);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Update a gallery item
export const updateGallery = async (req, res) => {
  try {
    const { title, country, reorder } = req.body;
    const { id } = req.params;

    if (!title || !country || !reorder) {
      return res.status(400).json({
        message: "Please send all required fields: title, country, reorder",
      });
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Replace image if a new one is uploaded
    if (req.file) {
      if (gallery.image) {
        const oldImagePath = path.join(process.cwd(), "uploads", path.basename(gallery.image));
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      gallery.image = `/uploads/${req.file.filename}`;
    }

    gallery.title = title;
    gallery.country = country;
    gallery.reorder = reorder;

    const updatedGallery = await gallery.save();

    return res.status(200).json({
      message: "Gallery updated successfully",
      data: updatedGallery,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Delete a gallery item
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Delete image file
    if (gallery.image) {
      const imagePath = path.join(process.cwd(), "uploads", path.basename(gallery.image));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
