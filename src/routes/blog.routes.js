import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/blog.controller.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getAllPosts);
router.get("/me", authenticateToken, getMyPosts);
router.get("/:id", authenticateToken, getPostById);
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router;
