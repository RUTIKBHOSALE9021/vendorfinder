const express = require("express");
const {
  createVendorController,
  getAllVendorsController,
  getFavoriteVendorsController,
  getVendorByIdController,
  addVendorToFavorite,
} = require("../controllers/vendorController");

const router = express.Router();

//vendor routes
router.post("/create", createVendorController);
router.get("/getall", getAllVendorsController);
router.get("/getbyid/:id", getVendorByIdController);
router.get("/getfavorite/:user_id", getFavoriteVendorsController);
router.post("/addtofavorite", addVendorToFavorite);

module.exports = router;
