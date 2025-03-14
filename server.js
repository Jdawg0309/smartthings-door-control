const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const lockRoutes = require("./routes/lockRoutes");
const doorRoutes = require("./routes/doorRoutes");
const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json());

// API routes
app.use("/api/v1/locks", lockRoutes);
app.use("/api/v1/doors", doorRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});