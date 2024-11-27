const axios = require("axios");
const { baseURL, authToken } = require("../config/smartthingsConfig");

exports.setCode = async (req, res) => {
  const { deviceId, slot, code, label } = req.params; // Extract deviceId, slot, code, label from params

  // Validate parameters
  if (!deviceId || !slot || !code || !label) {
    return res.status(400).json({ error: "deviceId, slot, code, and label are required." });
  }

  // Parse slot to integer
  const parsedSlot = parseInt(slot, 10);
  if (isNaN(parsedSlot)) {
    return res.status(400).json({ error: "Slot must be a valid integer." });
  }

  // Log received parameters
  console.log(`[DEBUG] deviceId: ${deviceId}`);
  console.log(`[DEBUG] slot: ${parsedSlot}`);
  console.log(`[DEBUG] code: ${code}`);
  console.log(`[DEBUG] label: ${label}`);

  const url = `${baseURL}/${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: "main",
        capability: "lockCodes",
        command: "setCode",
        arguments: [parsedSlot, code, label],
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

exports.lockUnlock = async (req, res) => {
  const { deviceId, action } = req.params;

  // Validate action
  if (!deviceId || !action || (action !== "lock" && action !== "unlock")) {
    return res.status(400).json({
      error: 'deviceId and a valid action ("lock" or "unlock") are required.',
    });
  }

  console.log(`[DEBUG] deviceId: ${deviceId}`);
  console.log(`[DEBUG] action: ${action}`);

  const url = `${baseURL}/${deviceId}/commands`;
  const payload = {
    commands: [
      {
        component: "main",
        capability: "lock",
        command: action, // "lock" or "unlock"
        arguments: [],
      },
    ],
  };

  console.log(`[DEBUG] Sending request to: ${url}`);
  console.log(`[DEBUG] Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    res.status(200).json({
      message: `${action} action performed successfully.`,
      data: response.data,
    });
  } catch (error) {
    console.error(`[ERROR] Failed to ${action}:`, error.response?.data || error.message);
    res.status(500).json({
      error: `Failed to ${action}.`,
      details: error.response?.data || error.message,
    });
  }
};
