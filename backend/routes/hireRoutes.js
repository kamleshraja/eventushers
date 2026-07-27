const express = require("express");
const router = express.Router();
const HireRequest = require("../models/HireRequest");

// GET all hire & crew applications (Admin)
router.get("/", async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const requests = await HireRequest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST submit client staffing request or crew application
router.post("/", async (req, res) => {
  try {
    const { type, fullName, email, phone, eventType, crewNeeded, crewCount, eventDate, location, notes } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Full Name, Email, and Phone are required" });
    }

    const request = await HireRequest.create({
      type: type || "hire_staff",
      fullName,
      email,
      phone,
      eventType: eventType || "Corporate Event",
      crewNeeded: crewNeeded || "Ushers & Hostesses",
      crewCount: crewCount || "5-10",
      eventDate,
      location: location || "Nairobi",
      notes: notes || "",
    });

    res.status(201).json({ success: true, message: "Request submitted successfully", data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update request status (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const request = await HireRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE request (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await HireRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
