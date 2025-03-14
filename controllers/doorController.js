const logger = require('../utils/logger'); // Assuming you have a logger utility

exports.getAllDoors = (req, res) => {
  try {
    // Mock data for doors
    const doors = [
      { id: 1, name: 'Front Door', status: 'locked' },
      { id: 2, name: 'Back Door', status: 'unlocked' },
    ];
    logger.info('Fetched all doors successfully');
    res.status(200).json({ message: 'Doors fetched successfully', data: doors });
  } catch (error) {
    logger.error(`Error fetching doors: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};