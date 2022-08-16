import categories from "../models/category.js"

class CategoryController {

  static listCategories = (req, res) => {
    categories.find((err, categories) => {
      res.status(200).json(categories)
    })
  }

  static listCategoriesById = (req, res) => {
    const id = req.params.id
    categories.findById(id, (err, categories) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id da categoria não localizado.`})
      } else {
        res.status(200).send(categories)
      }
    })
  }

  static registerCategory = (req, res) => {
    let category = new categories(req.body)
    category.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao registrar a categoria!`})
      } else {
        res.status(201).send(category.toJSON())
      }
    })
  }

  static updateCategory = (req, res) => {
    const id = req.params.id
    categories.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria atualizada com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteCategory = (req, res) => {
    const id = req.params.id
    categories.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria removida com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default CategoryController