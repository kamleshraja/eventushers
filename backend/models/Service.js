const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceId: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    features: [{ type: String }],
    deliverables: [{ type: String }],
    idealFor: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Service || mongoose.model("Service", serviceSchema);
