const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "eventushers-jwt-secret-key-2026";

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check MongoDB Atlas Database First
    let user = await User.findOne({ email: cleanEmail });

    if (user) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    }

    // Fallback: Default Initial Admin Creation if no DB user exists yet
    if (cleanEmail === "admin@eventushers.com" && password === "admin123") {
      user = await User.create({
        name: "Admin Manager",
        email: "admin@eventushers.com",
        password: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });

      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    }

    return res.status(401).json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Current User Profile
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Update Admin User Profile & Password in MongoDB Atlas
router.put("/profile", async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword, avatar, role } = req.body;

    const targetEmail = email ? email.toLowerCase().trim() : "admin@eventushers.com";
    let user = await User.findOne({ email: targetEmail });

    if (!user) {
      user = await User.findOne();
    }

    if (!user) {
      user = new User({
        name: name || "Admin Manager",
        email: targetEmail,
        password: newPassword || "admin123",
        role: role || "admin",
        avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });
    } else {
      // If changing password, verify current password
      if (newPassword) {
        if (currentPassword) {
          const isMatch = await user.matchPassword(currentPassword);
          if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect" });
          }
        }
        user.password = newPassword;
      }

      if (name) user.name = name;
      if (email) user.email = email.toLowerCase().trim();
      if (avatar) user.avatar = avatar;
      if (role) user.role = role;
    }

    await user.save();

    res.json({
      success: true,
      message: "Admin profile & password updated successfully in MongoDB Atlas",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
