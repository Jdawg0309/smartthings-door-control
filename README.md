
# SmartThings Door Control API

This project is a Node.js and Express-based API that integrates with the SmartThings API to manage connected door locks. It provides the ability to:
- **Set lock codes** via URL parameters.
- **Lock and unlock doors** using URL parameters.
- **Log and debug requests** for troubleshooting.

---

## Features

- **Set Lock Codes**: Easily assign custom lock codes to specific slots on SmartThings-compatible locks.
- **Lock/Unlock Doors**: Remotely control the state of your locks.
- **URL-Based Control**: Supports operations via URL, making it accessible directly from a browser.
- **Error Handling**: Includes robust error handling for invalid requests or parameters.
- **Debugging Logs**: Logs API requests and payloads for easier debugging.

---

## Project Structure

```
smartthings-door-control/
├── controllers/
│   └── lockController.js   # Handles lock-related actions
├── routes/
│   └── lockRoutes.js       # Defines API routes
├── config/
│   └── smartthingsConfig.js # Configuration for SmartThings API
├── .env                    # Environment variables (e.g., API token)
├── server.js               # Main server file
├── package.json            # Project metadata and dependencies
└── README.md               # Documentation
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
- **URL**: `GET /api/locks/:deviceId/set-code/:slot/:code/:label`
- **Description**: Sets a lock code for the specified device.
- **URL Parameters**:
  - `deviceId` (string): The SmartThings device ID.
  - `slot` (integer): The slot number for the lock code.
  - `code` (string): The lock code.
  - `label` (string): A label for the lock code.
- **Example**:
  ```plaintext
  http://localhost:5000/api/locks/bee383a7-49c4-4698-83f6-b6674d5bbd56/set-code/1/1234/TestCode
  ```
- **Response**:
  - Success: `200 OK`
  - Error: `400 Bad Request` or `500 Internal Server Error`

### 2. **Lock/Unlock Door**
- **URL**: `GET /api/locks/:deviceId/lock-unlock/:action`
- **Description**: Locks or unlocks the specified device.
- **URL Parameters**:
  - `deviceId` (string): The SmartThings device ID.
  - `action` (string): The desired action (`lock` or `unlock`).
- **Example**:
  ```plaintext
  http://localhost:5000/api/locks/bee383a7-49c4-4698-83f6-b6674d5bbd56/lock-unlock/lock
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

1. Make changes to the project files.
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

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Created by **Junaet Mahbub** (GitHub: [Jdawg0309](https://github.com/Jdawg0309)).

---
