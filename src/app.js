require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const dishRoutes = require('./routes/dishRoutes');
const cors = require('cors');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Set up routes
app.use('/', dishRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);  // Exit process
  });

  // If server takes too long to shut down, forcefully exit
  setTimeout(() => {
    console.error('Forceful shutdown due to timeout');
    process.exit(1);
  }, 10000);  // 10 seconds timeout before forcing shutdown
};

process.on('SIGINT', shutdown); // Ctrl+C
process.on('SIGTERM', shutdown); // System shutdown
