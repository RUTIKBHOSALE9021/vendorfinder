const {
  createVendor,
  getAllVendors,
  getVendorById,
  getFavoriteVendors,
  addFavoriteVendor,
  removeFromFavorite
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

const getAllVendorsController = async (req, res) => {
  const { user_id } = req.body;
  try {
    const vendors = await getAllVendors(user_id);
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
 
const addVendorToFavorite = async (req, res) => {
  const { user_id, vendor_id } = req.body;
  
  try {
    const result = await addFavoriteVendor(user_id, vendor_id);

    if (result.rowCount === 0) {
      return res.status(409).json({ message: "Vendor already in favorites" });
    }

    return res.status(201).json({ 
      message: "Vendor added to favorites", 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error("Error adding vendor to favorites:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getFavoriteVendorsController = async (req, res) => {
  const { user_id } = req.params;

  try {
    const vendors = await getFavoriteVendors(user_id);
    
    if (vendors.length === 0) {
      return res.status(404).json({ message: "No favorite vendors found" });
    }

    return res.status(200).json({ vendors });
  } catch (error) {
    console.error("Error getting favorite vendors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromFavoriteVendor = async (req, res) => {
  const { user_id, vendor_id } = req.body;

  try {
    const result = await removeFromFavorite(user_id, vendor_id);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No favorite vendor found for the given user" });
    }
    return res.status(200).json({ message: "Vendor removed from favorites successfully" });
  } catch (error) {
    console.error("Error removing favorite vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  createVendorController,
  getAllVendorsController,
  getVendorByIdController,
  getFavoriteVendorsController,
  getFavoriteVendorsController,
  addVendorToFavorite,
  removeFromFavoriteVendor
};
