// const express = require('express')
// const Article = require('../../models/article')
// const Category = require('../../models/category')
// const router = express.Router()

// router.get('/new', (req, res) => {
//   res.render('articles/new', { article: new Article() }) 
// })

// router.get('/edit/:id', async(req, res) => {
//   const article = await Article.findById(req.params.id)
//   res.render('articles/edit', { article: article})
// })

// router.get('/:slug', async (req, res) => {
//   const article = await Article.findOne({slug:req.params.slug})
//   if(article == null) res.redirect('/')
//   res.render('articles/show', {article:article})
// })

// router.post('/', async (req, res, next) => {
//   req.article = new Article()
//   next()
// }, saveArticleAndRedirect('new'))

// router.put(':/id', async (req,res, next)=> {
//   req.article = await Article.findById(req.params.id)
//   next()
// }, saveArticleAndRedirect('new'))

// router.delete('/:id', async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id)
//   res.redirect('/')
// })

// function saveArticleAndRedirect(path){
//   return async (req, res) => {
//     console.log({body:req.body})
//     let article = req.article
//     article.title = req.body.title
//     article.metadescription = req.body.metadescription
//     article.markdown = req.body.markdown
//     let category = new Category()
//     category.name = req.body.category

//     try {
//       article = await article.save()
//       category = await category.save()
//       res.redirect(`/articles/${article.slug}`)
//     } catch(e) {
//       console.error(e)
//       res.render(`articles/${path}`, {article:article})
//     }
//   }
// }

// module.exports = router

import posts from "../models/post.js"

class PostController {
  static listPosts = (req, res) => {
    posts.find()
      .populate('category')
      .exec((err, posts) => {
      res.status(200).json(posts)
    })
  }

  static listPostsById = (req, res) => {
    const id = req.params.id
    posts.findById(id)
      .populate('category', 'name')
      .exec((err, posts) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do post não localizado.`})
      } else {
        res.status(200).send(posts)
      }
    })
  }

  static registerPost = (req, res) => {
    let post = new posts(req.body)
    post.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao registrar o post!`})
      } else {
        res.status(201).send(post.toJSON())
      }
    })
  }

  static updatePost = (req, res) => {
    const id = req.params.id
    posts.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Post atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deletePost = (req, res) => {
    const id = req.params.id
    posts.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: 'Post removido com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default PostController