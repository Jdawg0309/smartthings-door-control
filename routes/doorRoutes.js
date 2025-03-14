const express = require("express");
const router = express.Router();
const doorController = require("../controllers/doorController");

// Route to get all doors
router.get("/", doorController.getAllDoors);

module.exports = router;