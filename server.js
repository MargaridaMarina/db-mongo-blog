// const express = require('express')
// const mongoose = require('mongoose')
// const Article = require('./models/article')
// const cors = require('cors')
// const articleRouter = require('./routes/articles')
// const methodOverride = require('method-override')
// const Category = require('./models/category')
// const app = express()

// mongoose.connect('mongodb://127.0.0.1/blog')

import app from './src/app.js'

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})

// app.set('view engine', 'ejs');

// app.use(cors())
// app.use(express.urlencoded({extended:false}))
// app.use(methodOverride('_method'))

// app.get('/', async (req, res) => {
//   const articles = await Article.find().sort({createdAt:'desc'})
//   console.log({articles})
//   res.render('articles/index', {articles: articles})
//   // res.json(articles)
// })

// app.get('/categorias', async (req, res) => {
//   const articles = await Category.find().sort({createdAt:'desc'})
//   console.log("category")
//   // res.render('articles/index', {articles: articles})
//   res.json(articles)
// })

// app.get('/posts', async (req, res) => {
//   const articles = await Article.find().sort({createdAt:'desc'})
//   console.log("post")
//   // res.render('articles/index', {articles: articles})
//   res.json(articles)
// })

// app.use('/articles', articleRouter)

// app.listen(5000)