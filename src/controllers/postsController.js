import categoriesModel from '../models/category.js'
import postsModel from '../models/post.js'

class PostController {
  static listPosts = (req, res) => {
    postsModel
      .find()
      .populate('postCategory')
      .exec((err, postData) => {
        // console.log(postData)
        res.status(200).json(postData)
      })
  }

  static listPostsById = (req, res) => {
    const id = req.params.id
    postsModel
      .findById(id)
      .populate('postCategory', 'categoryName')
      .exec((err, postData) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do post não localizado.` })
        } else {
          res.status(200).send(postData)
        }
      })
  }

  static listPostsByCategoryId = (req, res) => {
    const id = req.params.id
    postsModel  
      .find({postCategory: id})
      .populate('postCategory', 'categoryName')
      .exec((err, postData) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do post não localizado.` })
        } else {
          res.status(200).send(postData)
        }
      })
  }

  static registerPost = async (req, res) => {
    const data = req.body
    const { postCategory, ...postInfos } = data

    try {
      const cat = new categoriesModel({
        categoryName: postCategory
      })
      const savedCategory = await cat.save()
      const post = new postsModel({
        postCategory: savedCategory._id,
        ...postInfos
      })
      await post.save()
      res.status(201).send(post.toJSON())
    } catch (err) {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao registrar o post!` })
    }
  }

  static updatePost = (req, res) => {
    const id = req.params.id
    postsModel.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (!err) {
        res.status(200).send({ message: 'Post atualizado com sucesso!' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static deletePost = (req, res) => {
    const id = req.params.id
    postsModel.findByIdAndDelete(id, err => {
      if (!err) {
        res.status(200).send({ message: 'Post removido com sucesso!' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }
}

export default PostController
