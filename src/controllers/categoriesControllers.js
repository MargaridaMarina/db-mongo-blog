import categoriesModel from "../models/category.js"

class CategoryController {

  static listCategories = (req, res) => {
    categoriesModel.find((err, categoryData) => {
      res.status(200).json(categoryData)
    })
  }

  static listCategoriesById = (req, res) => {
    const id = req.params.id
    categoriesModel.findById(id, (err, categoryData) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id da categoria não localizado.`})
      } else {
        res.status(200).send(categoryData)
      }
    })
  }

  static registerCategory = (req, res) => {
    let categoryData = new categoriesModel(req.body)
    categoryData.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao registrar a categoria!`})
      } else {
        res.status(201).send(categoryData.toJSON())
      }
    })
  }

  static updateCategory = (req, res) => {
    const id = req.params.id
    categoriesModel.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria atualizada com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteCategory = (req, res) => {
    const id = req.params.id
    categoriesModel.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria removida com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default CategoryController