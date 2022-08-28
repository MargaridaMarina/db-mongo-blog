import categories from '../models/category.js'
import posts from '../models/post.js'

class PostController {
  static listPosts = (req, res) => {
    posts
      .find()
      .populate('category')
      .exec((err, posts) => {
        res.status(200).json(posts)
      })
  }

  static listPostsById = (req, res) => {
    const id = req.params.id
    posts
      .findById(id)
      .populate('category', 'name')
      .exec((err, posts) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do post não localizado.` })
        } else {
          res.status(200).send(posts)
        }
      })
  }

  static registerPost = async (req, res) => {
    const data = req.body
    const { category, ...postInfos } = data

    try {
      const cat = new categories({
        name: category
      })

      const savedCategory = await cat.save()
      const post = new posts({
        category: savedCategory._id,
        ...postInfos
      })

      await post.save()
      res.status(201).send(post.toJSON())
    } catch (error) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao registrar o post!` })
    }
  }

  static updatePost = (req, res) => {
    const id = req.params.id
    posts.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (!err) {
        res.status(200).send({ message: 'Post atualizado com sucesso!' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static deletePost = (req, res) => {
    const id = req.params.id
    posts.findByIdAndDelete(id, err => {
      if (!err) {
        res.status(200).send({ message: 'Post removido com sucesso!' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }
}

export default PostController
