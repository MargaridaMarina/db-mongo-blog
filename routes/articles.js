const express = require('express')
const Article = require('./../models/article')
const Category = require('./../models/category')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async(req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article})
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({slug:req.params.slug})
  if(article == null) res.redirect('/')
  res.render('articles/show', {article:article})
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put(':/id', async (req,res, next)=> {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('new'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path){
  return async (req, res) => {
    console.log({body:req.body})
    let article = req.article
    article.title = req.body.title
    article.metadescription = req.body.metadescription
    article.markdown = req.body.markdown
    let category = new Category()
    category.name = req.body.category

    try {
      article = await article.save()
      category = await category.save()
      res.redirect(`/articles/${article.slug}`)
    } catch(e) {
      console.error(e)
      res.render(`articles/${path}`, {article:article})
    }
  }
}

module.exports = router