const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, default: "Staffing & Logistics" },
    date: { type: String, default: () => new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }) },
    readTime: { type: String, default: "4 min read" },
    author: { type: String, default: "afriCrew Team" },
    authorRole: { type: String, default: "Hospitality & Crew Specialist" },
    authorAvatar: { type: String, default: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    excerpt: { type: String, required: true },
    image: { type: String, default: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
    tags: [{ type: String }],
    keyTakeaways: [{ type: String }],
    content: { type: String, default: "" },
    sections: [
      {
        heading: String,
        paragraphs: [String],
        quote: String,
        bulletPoints: [String],
      },
    ],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
