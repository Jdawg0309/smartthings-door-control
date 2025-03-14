const axios = require('axios');
const logger = require('../utils/logger'); // Assuming you have a logger utility
const { baseURL } = require('../config/smartthingsConfig');

exports.setCode = async (req, res) => {
  const { deviceId, slot, code, label } = req.params;

  // Validate parameters
  if (!deviceId || !slot || !code || !label) {
    logger.warn('Missing required parameters');
    return res.status(400).json({ error: 'deviceId, slot, code, and label are required.' });
  }

  const parsedSlot = parseInt(slot, 10);
  if (isNaN(parsedSlot)) {
    logger.warn('Invalid slot parameter');
    return res.status(400).json({ error: 'Slot must be a valid integer.' });
  }

  logger.debug(`deviceId: ${deviceId}, slot: ${parsedSlot}, code: ${code}, label: ${label}`);

  const url = `${baseURL}/${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: 'main',
        capability: 'lockCodes',
        command: 'setCode',
        arguments: [parsedSlot, code, label],
      },
    ],
  };

  logger.debug(`Sending request to: ${url}`);
  logger.debug(`Payload: ${JSON.stringify(payload, null, 2)}`);

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    logger.info('Lock code set successfully');
    res.status(200).json({
      message: 'Lock code set successfully.',
      data: response.data,
    });
  } catch (error) {
    logger.error(`Failed to set lock code: ${error.response?.data || error.message}`);
    res.status(500).json({
      error: 'Failed to set lock code.',
      details: error.response?.data || error.message,
    });
  }
};

exports.lockUnlock = async (req, res) => {
  const { deviceId, action } = req.params;

  // Validate action
  if (!deviceId || !action || (action !== 'lock' && action !== 'unlock')) {
    logger.warn('Invalid action parameter');
    return res.status(400).json({
      error: 'deviceId and a valid action ("lock" or "unlock") are required.',
    });
  }

  logger.debug(`deviceId: ${deviceId}, action: ${action}`);

  const url = `${baseURL}/${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: 'main',
        capability: 'lock',
        command: action,
        arguments: [],
      },
    ],
  };

  logger.debug(`Sending request to: ${url}`);
  logger.debug(`Payload: ${JSON.stringify(payload, null, 2)}`);

  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
    });

    logger.info(`${action} action performed successfully`);
    res.status(200).json({
      message: `${action} action performed successfully.`,
      data: response.data,
    });
  } catch (error) {
    logger.error(`Failed to ${action}: ${error.response?.data || error.message}`);
    res.status(500).json({
      error: `Failed to ${action}.`,
      details: error.response?.data || error.message,
    });
  }
};