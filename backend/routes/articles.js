const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const authenticate = require('../middleware/auth');

// Create an article
router.post('/', authenticate, async (req, res) => {
  try {
    // Assume req.user has been set by your authentication middleware
    const { title, content, tags } = req.body;
    const article = new Article({
      title,
      content,
      tags,
      author: req.user.userId, // record the user who created the article
    });
    await article.save();
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    res.status(500).json({ error: 'Error creating article' });
  }
});

// Read all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'username');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching articles' });
  }
});

// Read a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'username');
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching article' });
  }
});

// Update an article
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    
    // Optionally check if the requesting user is the author or has appropriate role
    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied: not the author' });
    }
    
    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;
    await article.save();
    res.json({ message: 'Article updated successfully', article });
  } catch (error) {
    res.status(500).json({ error: 'Error updating article' });
  }
});

// Delete an article
router.delete('/:id', authenticate, async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });
      
      // Verify that the requesting user is the author
      if (article.author.toString() !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied: not the author' });
      }
      
      await article.deleteOne();
res.json({ message: 'Article deleted successfully' });

    } catch (error) {
      console.error("Error deleting article:", error);  // Log the error for debugging
      res.status(500).json({ error: 'Error deleting article', details: error.message });
    }
  });

module.exports = router;
