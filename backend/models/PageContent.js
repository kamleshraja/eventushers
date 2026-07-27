const mongoose = require("mongoose");

const pageContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true }, // e.g. 'home', 'about', 'services', 'contact'
    pageTitle: { type: String, required: true },
    path: { type: String, required: true },
    heroHeadline: { type: String, default: "" },
    heroSubheading: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    customContent: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.models.PageContent || mongoose.model("PageContent", pageContentSchema);
