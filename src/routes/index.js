import express from "express"
import postsModel from "./postsRoutes.js"
import categoriesModel from "./categoriesRoutes.js"

const routes = (app) => {
  app.route('/').get((req,res) => {
    res.status(200).send({titulo: "Blog da Margô"})
  })

  app.use(
    express.json(),
    postsModel,
    categoriesModel
  )
}

export default routes