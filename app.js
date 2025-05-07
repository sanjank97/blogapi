const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files (images) from uploads folder
app.use('/uploads', express.static('uploads'));

// Test DB connection
db.getConnection()
  .then(connection => {
    console.log("Connected to the database!");
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error("Error connecting to the database: ", err.message);
    process.exit(1); // Exit the process if DB connection fails
  });

// Routes
const authRoutes = require('./routes/authRoutes');
// Uncomment when ready to use these routes
 const postRoutes = require('./routes/postRoutes');
 const commentRoutes = require('./routes/commentRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Global error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

