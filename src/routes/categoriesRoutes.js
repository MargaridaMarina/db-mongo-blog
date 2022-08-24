import express from "express"
import CategoryController from "../controllers/categoriesControllers.js"

const router = express.Router()

router
  .get("/categorias", CategoryController.listCategories)
  .post("/categorias", CategoryController.registerCategory)
  .put("/categorias/:id", CategoryController.updateCategory)
  .get("/categorias/:id", CategoryController.listCategoriesById)
  .delete("/categorias/:id", CategoryController.deleteCategory)

export default router