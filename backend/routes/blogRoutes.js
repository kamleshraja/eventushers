const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// GET all blog articles (Admin & Public)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single blog article by slug or ID
router.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let blog;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      const numId = Number(idOrSlug);
      blog = await Blog.findOne({
        $or: [
          ...(isNaN(numId) ? [] : [{ id: numId }]),
          { slug: idOrSlug },
        ],
      });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog article not found" });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create new blog article (Admin)
router.post("/", async (req, res) => {
  try {
    const { title, category, excerpt, content, image, author, authorRole, tags, keyTakeaways } = req.body;

    if (!title || !excerpt) {
      return res.status(400).json({ success: false, message: "Title and excerpt are required" });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const blog = await Blog.create({
      title,
      slug,
      category: category || "Staffing & Logistics",
      excerpt,
      content: content || excerpt,
      image: image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      author: author || "afriCrew Team",
      authorRole: authorRole || "Operations Lead",
      tags: tags || ["Event Staffing"],
      keyTakeaways: keyTakeaways || ["Standardized protocol ensures event success."],
      published: true,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT update blog article (Handles Mongo _id, numeric id, or slug with upsert)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let blog;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findByIdAndUpdate(id, { ...req.body, published: true }, { new: true, runValidators: true });
    } else {
      const numId = Number(id);
      blog = await Blog.findOneAndUpdate(
        {
          $or: [
            ...(isNaN(numId) ? [] : [{ id: numId }]),
            { slug: id },
          ],
        },
        { ...req.body, published: true },
        { new: true }
      );
    }

    // If blog not found by ID or slug, create it (upsert)
    if (!blog) {
      const slug = req.body.slug || req.body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || id;
      blog = await Blog.create({
        ...req.body,
        slug,
        published: true,
      });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE blog article
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let blog;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findByIdAndDelete(id);
    } else {
      const numId = Number(id);
      blog = await Blog.findOneAndDelete({
        $or: [
          ...(isNaN(numId) ? [] : [{ id: numId }]),
          { slug: id },
        ],
      });
    }

    res.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
