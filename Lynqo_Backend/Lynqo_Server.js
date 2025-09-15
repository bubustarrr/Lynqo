const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
let pool;
(async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // Lynqo_DB
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    // Test connection
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL database:", process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1); // Stop server if DB connection fails
  }
})();

// Test route
app.get("/", (req, res) => {
  res.send("Lynqo backend is running 🚀");
});

// Example: get all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));