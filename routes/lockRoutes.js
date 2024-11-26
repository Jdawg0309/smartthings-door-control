const express = require('express');
const router = express.Router();
const lockController = require('../controllers/lockController');

// Route to set a lock code
router.post('/:deviceId/set-code', lockController.setCode);

// Route to lock/unlock a door
router.post('/:deviceId/lock-unlock', lockController.lockUnlock);

module.exports = router;
