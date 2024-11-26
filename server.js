const express = require("express");
const cors = require("cors");
const lockRoutes = require("./routes/lockRoutes"); // Import lock routes
const morgan = require("morgan");


require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use morgan for request logging
app.use(morgan("combined"));



// Use lock routes with a base path
app.use("/api/locks", lockRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
