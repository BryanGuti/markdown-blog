const express = require('express');
const Article= require('../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({slug: req.params.slug});

  if (article === null) res.redirect('/');
  else res.render('articles/show', { article });
});

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article });
})

router.post('/', async (req, res, next) => {
  req.article = new Article();
  next();
}, saveAndRedirectArticle('new'));

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next();
}, saveAndRedirectArticle('edit'));

router.delete('/:id', async(req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

function saveAndRedirectArticle(path){
  return async (req, res) => {
    const article = req.article;
    article.title = req.body.title
    article.description = req.body.description
    article.blog = req.body.blog

    try {
      const createdArticle = await article.save();
      res.redirect(`/articles/${createdArticle.slug}`);
    } catch (error) {
      res.render(`articles/${path}`, { article });
    }
  }
}

module.exports = router