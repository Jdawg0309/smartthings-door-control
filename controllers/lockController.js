const axios = require('axios');
const { baseURL, authToken } = require('../config/smartthingsConfig');

// Set a lock code
exports.setCode = async (req, res) => {
  const { deviceId } = req.params; // Extract deviceId from params
  const { slot, code, label } = req.body; // Extract body parameters

  if (!deviceId || !slot || !code || !label) {
    return res.status(400).json({ error: "deviceId, slot, code, and label are required." });
  }

  console.log(`[DEBUG] Received deviceId: ${deviceId}`); // Log the deviceId

  const url = `${baseURL}${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: "main",
        capability: "lockCodes",
        command: "setCode",
        arguments: [slot, code, label],
      },
    ],
  };

  console.log(`[DEBUG] Sending request to: ${url}`);
  console.log(`[DEBUG] Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      message: "Lock code set successfully.",
      data: response.data,
    });
  } catch (error) {
    console.error(`[ERROR] Failed to set lock code:`, error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to set lock code.",
      details: error.response?.data || error.message,
    });
  }
};



// Lock or unlock a door
exports.lockUnlock = async (req, res) => {
  const { deviceId } = req.params;
  const { action } = req.body;

  if (!action || (action !== 'lock' && action !== 'unlock')) {
    return res.status(400).json({ error: 'Valid action ("lock" or "unlock") is required' });
  }

  const url = `${baseURL}${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: 'main',
        capability: 'lock',
        command: action, // "lock" or "unlock"
        arguments: [],
      },
    ],
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    res.status(200).json({ message: `${action} action successful`, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
