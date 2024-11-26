const express = require('express');
const router = express.Router();
const doorController = require('../controllers/doorController'); // Ensure the correct path

// Route to get all doors
router.get('/', doorController.getAllDoors);

module.exports = router;
