const express = require("express");
const { createVendorController } = require("../controllers/vendorController");

const router = express.Router();

//vendor routes
router.post("/create", createVendorController);

module.exports = router;
