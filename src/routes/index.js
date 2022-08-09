import express from "express"
import articles from "../models/article.js"
import categories from "../models/category.js"

const routes = (app) => {
  app.route('/').get((req,res) => {
    res.status(200).send({titulo: "Blog da Margô"})
  })

  app.use(
    express.json(),
    articles,
    categories
  )
}

export default routes