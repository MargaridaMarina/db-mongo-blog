import express from "express"
import posts from "./postsRoutes.js"
import categories from "./categoriesRoutes.js"

const routes = (app) => {
  app.route('/').get((req,res) => {
    res.status(200).send({titulo: "Blog da Margô"})
  })

  app.use(
    express.json(),
    posts,
    categories
  )
}

export default routes