const mongoose = require("mongoose");

const hireRequestSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["hire_staff", "join_crew"], default: "hire_staff" },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, default: "Corporate Conference" },
    crewNeeded: { type: String, default: "Ushers & Hostesses" },
    crewCount: { type: String, default: "5-10" },
    eventDate: { type: String },
    location: { type: String, default: "Nairobi" },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["pending", "contacted", "approved", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.HireRequest || mongoose.model("HireRequest", hireRequestSchema);
