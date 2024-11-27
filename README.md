
# SmartThings Door Control API

This project is a Node.js and Express-based API that integrates with the SmartThings API to manage connected door locks. It allows users to:
- **Set lock codes**
- **Lock and unlock doors**
- **Log and debug requests**

---

## Features

- **Set Lock Codes**: Assign custom lock codes to specific slots on SmartThings-compatible locks.
- **Lock/Unlock Doors**: Remotely control the state of your locks.
- **Error Handling**: Includes robust error handling for malformed requests and invalid device IDs.
- **Debugging Logs**: Logs API requests and payloads for easier debugging.

---

## Project Structure

```
SmartThings Door Control API/
├── controllers/
│   └── lockController.js   # Handles lock-related actions
├── routes/
│   └── lockRoutes.js       # Defines routes for API endpoints
├── config/
│   └── smartthingsConfig.js # Configuration for SmartThings API
├── .env                    # Environment variables (e.g., API token)
├── server.js               # Main server file
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (v7 or later)
- A **SmartThings Personal Access Token (PAT)** with the `devices:read` and `devices:write` scopes.
- A SmartThings-compatible lock with the `lockCodes` capability.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jdawg0309/smartthings-door-control.git
   cd smartthings-door-control
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your SmartThings token:
   ```
   SMARTTHINGS_TOKEN=your_personal_access_token_here
   ```

4. Start the server:
   ```bash
   node server.js
   ```

---

## API Endpoints

### 1. **Set Lock Code**
- **URL**: `POST /api/locks/:deviceId/set-code`
- **Description**: Sets a lock code for the specified device.
- **Request Body**:
  ```json
  {
    "slot": 1,
    "code": "1234",
    "label": "Test Code"
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` or `500 Internal Server Error`

### 2. **Lock/Unlock Door**
- **URL**: `POST /api/locks/:deviceId/lock-unlock`
- **Description**: Locks or unlocks the specified device.
- **Request Body**:
  ```json
  {
    "action": "lock"
  }
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` or `500 Internal Server Error`

---

## Logging and Debugging

- Logs the payload and API responses in the console for each request.
- Debugging logs can be viewed directly in the terminal when the server is running.

---

## Development Workflow

1. **Make changes** to the project files.
2. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. Push changes to GitHub:
   ```bash
   git push origin main
   ```

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit and push your changes.
4. Submit a pull request.


## Author

Created by **Junaet Mahbub** (GitHub: [Jdawg0309](https://github.com/Jdawg0309)).
