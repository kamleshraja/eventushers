const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET all services
router.get("/", async (req, res) => {
  try {
    const filter = req.query.all === "true" ? {} : { active: true };
    const services = await Service.find(filter).sort({ createdAt: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single service by serviceId
router.get("/:serviceId", async (req, res) => {
  try {
    const service = await Service.findOne({
      $or: [{ serviceId: req.params.serviceId }, { _id: req.params.serviceId }],
    });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create service
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update service
router.put("/:id", async (req, res) => {
  try {
    let service = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }
    if (!service) {
      service = await Service.findOneAndUpdate({ serviceId: req.params.id }, req.body, { new: true });
    }
    if (!service) {
      service = await Service.create({ ...req.body, serviceId: req.params.id });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
