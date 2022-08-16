import express from "express"
import CategoryController from "../controllers/categoriesControllers.js"

const router = express.Router()

router
  .get("/categories", CategoryController.listCategories)
  .post("/categories", CategoryController.registerCategory)
  .put("/categories/:id", CategoryController.updateCategory)
  .get("/categories/:id", CategoryController.listCategoriesById)
  .delete("/categories/:id", CategoryController.deleteCategory)

export default router