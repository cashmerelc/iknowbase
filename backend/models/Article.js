const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },  // could store Markdown or HTML
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
}, {
  timestamps: true, // automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Article', ArticleSchema);
