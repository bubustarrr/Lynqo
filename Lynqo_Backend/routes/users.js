import express from "express";
import { getUsers, createUser, loginUser, authMiddleware } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);              // public
router.post("/register", createUser);   // public
router.post("/login", loginUser);       // public

// Example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

export default router;
