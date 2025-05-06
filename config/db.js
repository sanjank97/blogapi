const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'blogdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to test the connection (optional but helpful for debugging)
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Call testConnection to verify DB connection
testConnection();

module.exports = pool;
