const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  blog: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    })
  }

  if (this.blog) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.blog));
  }

  next();
});

module.exports = mongoose.model('Article', articleSchema);