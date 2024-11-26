require('dotenv').config();

module.exports = {
  baseURL: 'https://api.smartthings.com/v1/devices/',
  authToken: process.env.SMARTTHINGS_API_TOKEN, // Load API token from .env
};
