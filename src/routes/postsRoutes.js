import express from "express"
import PostController from "../controllers/postsController.js"

const router = express.Router()

router
  .get("/posts", PostController.listPosts)
  .get("/posts/:id", PostController.listPostsById)
  .post("/posts", PostController.registerPost)
  .put("/posts/:id", PostController.updatePost)
  .delete("/posts/:id", PostController.erasePost)

export default router