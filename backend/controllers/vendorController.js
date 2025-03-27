const {createVendor} = require("../models/vendorModel");

const createVendorController = async (req, res) => {
  try {
    const { name, description, category, location, image, contactEmail, contactPhone, pricing, rating } = req.body;
    
    if (!name || !contactEmail) {
      return res.status(400).json({ error: "Name and Contact Email are required" });
    }

    const vendor = await createVendor(name, description, category, location, image, contactEmail, contactPhone, pricing, rating );
    

    res.status(201).json({ message: "Vendor added successfully", vendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createVendorController };
