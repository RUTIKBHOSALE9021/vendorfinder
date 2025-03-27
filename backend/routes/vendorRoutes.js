const express = require("express");
const { createVendorController,getAllVendorsController,getVendorByIdController } = require("../controllers/vendorController");

const router = express.Router();

//vendor routes
router.post("/create", createVendorController);
router.get("/getall", getAllVendorsController);
router.get("/getbyid", getVendorByIdController);

module.exports = router;
