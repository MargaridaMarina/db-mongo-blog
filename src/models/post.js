import mongoose from 'mongoose'
import slugify from 'slugify'

const postSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  metadescription: {
    type: String
  },
  postCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categoriesModel'
  },
  postSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categoriesModel'
  },
  image: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    // required:true,
    unique: true
  },
  sanitizedHtml: {
    type: String
  }
})

postSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const postsModel = mongoose.model('postsModel', postSchema)

export default postsModel
