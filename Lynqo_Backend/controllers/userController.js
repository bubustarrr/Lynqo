import pool from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey"; // 🔒 put in .env later

// GET all users (public, but no passwords)
export const getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT id, username, email, avatar_url, role FROM users");
  res.json(rows);
};

// REGISTER
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existing.length > 0) return res.status(400).json({ error: "Email already in use" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (username, email, password_hash, registration_date, role) VALUES (?, ?, ?, NOW(), 'user')",
    [username, email, hashedPassword]
  );

  res.json({ message: "User registered successfully!" });
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) return res.status(401).json({ error: "Invalid email or password" });

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });

  // create JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // update last login
  await pool.query("UPDATE users SET last_login = NOW() WHERE id = ?", [user.id]);

  res.json({ message: "Login successful!", token });
};

// MIDDLEWARE to protect routes
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
