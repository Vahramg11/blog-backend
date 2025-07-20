import {
  createPostService,
  getAllPostsService,
  getMyPostsService,
  updatePostService,
  deletePostService,
  getPostByIdService,
} from "../services/blog.service.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  const post = await createPostService(title, content, userId);
  res.status(201).json(post);
};

export const getAllPosts = async (req, res) => {
  const posts = await getAllPostsService();
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await getPostByIdService(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
};

export const getMyPosts = async (req, res) => {
  console.log(req.userId);

  const userId = req.userId;

  const posts = await getMyPostsService(userId);
  res.json(posts);
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const updated = await updatePostService(id, { title, content });
  res.json(updated);
};

export const deletePost = async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;

  await deletePostService(id);
  res.json({ message: "Post deleted" });
};
