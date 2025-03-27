const {
  createVendor,
  getAllVendors,
  getVendorById,
  getFavoriteVendors,
} = require("../models/vendorModel");

const createVendorController = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      location,
      image,
      contactEmail,
      contactPhone,
      pricing,
      rating,
    } = req.body;

    if (!name || !contactEmail) {
      return res
        .status(400)
        .json({ error: "Name and Contact Email are required" });
    }

    const vendor = await createVendor(
      name,
      description,
      category,
      location,
      image,
      contactEmail,
      contactPhone,
      pricing,
      rating
    );

    res.status(201).json({ message: "Vendor added successfully", vendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllVendorsController = async (_, res) => {
  try {
    const vendors = await getAllVendors();
    res.status(200).json({ vendors });
  } catch (error) {
    console.error("Error getting vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVendorByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await getVendorById(id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error getting vendor by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFavoriteVendorsController = async (req, res) => {
  try {
    const vendors = await getFavoriteVendors();
    res.status(200).json({ vendors });
  } catch (error) {
    console.error("Error getting favorite vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  createVendorController,
  getAllVendorsController,
  getVendorByIdController,
  getFavoriteVendorsController,
  getFavoriteVendorsController,
};
