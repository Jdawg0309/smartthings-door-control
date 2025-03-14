const express = require("express");
const router = express.Router();
const lockController = require("../controllers/lockController");

// Route to set a lock code
router.get("/:deviceId/set-code/:slot/:code/:label", lockController.setCode);

// Route to lock/unlock a door
router.get("/:deviceId/lock-unlock/:action", lockController.lockUnlock);

module.exports = router;