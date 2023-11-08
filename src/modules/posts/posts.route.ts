import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { PostsZodValidataion } from "./posts.validation";
import { PostsController } from "./posts.controller";

const router = express.Router();

router.post(
  "/posts/create",
  validateRequest(PostsZodValidataion.createPost),
  PostsController.createPost
);

router.get("/posts/:id", PostsController.getSinglePost);
router.delete("/posts/:id", PostsController.deletePost);
router.patch(
  "/posts/:id",
  validateRequest(PostsZodValidataion.updatePost),
  PostsController.updatePost
);

router.post("/posts", PostsController.getAllPosts);

export const PostRoutes = router;
