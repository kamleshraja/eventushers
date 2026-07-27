const express = require("express");
const router = express.Router();
const PageContent = require("../models/PageContent");

// GET all managed page contents
router.get("/", async (req, res) => {
  try {
    const pages = await PageContent.find();
    res.json({ success: true, count: pages.length, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET content for specific page key (e.g. 'home', 'about', 'services', 'contact')
router.get("/:pageKey", async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageKey: req.params.pageKey });
    if (!page) {
      return res.json({
        success: true,
        data: null,
        message: "Page content not customized yet; using default static template.",
      });
    }
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT / POST update page content
router.put("/:pageKey", async (req, res) => {
  try {
    const { pageKey } = req.params;
    const { pageTitle, path, heroHeadline, heroSubheading, metaTitle, metaDescription, customContent } = req.body;

    const updatedPage = await PageContent.findOneAndUpdate(
      { pageKey },
      {
        pageKey,
        pageTitle: pageTitle || pageKey,
        path: path || `/${pageKey === "home" ? "" : pageKey}`,
        heroHeadline,
        heroSubheading,
        metaTitle,
        metaDescription,
        customContent,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, message: `Page '${pageKey}' updated successfully`, data: updatedPage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
