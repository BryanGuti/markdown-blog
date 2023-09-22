require('dotenv').config();

const path = require('path');
const express = require('express');
const db = require('./database');
const dbConfig = require('./config/db.config');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8080

db.databaseConnect(dbConfig.url);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({createdAt: 'desc'});
  res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
