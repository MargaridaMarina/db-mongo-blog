import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String
  },
  categoryName: {
    type: String,
    required:true
  },
  subCategoryName: {
    type: String
  }
})

const categoriesModel = mongoose.model('categoriesModel', categorySchema)

export default categoriesModel
