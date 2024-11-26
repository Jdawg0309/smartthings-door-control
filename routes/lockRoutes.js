const express = require("express");
const router = express.Router();
const lockController = require("../controllers/lockController");

// Route to set a lock code
router.post("/:deviceId/set-code", lockController.setCode);

module.exports = router;