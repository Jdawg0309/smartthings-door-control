const express = require("express");
const router = express.Router();
const lockController = require("../controllers/lockController");

// Route to set a lock code (GET for browser compatibility)
router.get("/:deviceId/set-code/:slot/:code/:label", lockController.setCode);

// Route to lock/unlock a door (GET for browser compatibility)
router.get("/:deviceId/lock-unlock/:action", lockController.lockUnlock);

module.exports = router;
