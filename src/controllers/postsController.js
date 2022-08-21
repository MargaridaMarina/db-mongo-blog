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