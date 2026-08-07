const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    designation: { type: String, required: true },
    companyName: { type: String, required: false, default: "" },
    quote: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    eventBadgeTitle: { type: String, required: false, default: "" },
    profileImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
    isVerified: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdBy: { type: String, default: "Admin" },
    updatedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
