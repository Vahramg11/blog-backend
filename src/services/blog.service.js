import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPostService = (title, content, userId) => {
  return prisma.post.create({
    data: { title, content, authorId: userId },
  });
};

export const getAllPostsService = () => {
  return prisma.post.findMany({
    include: { author: true },
  });
};

export const getPostByIdService = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: { author: true },
  });
  if (post?.author) {
    delete post.author.password;
    delete post.author.createdAt;
  }

  return post;
};

export const getMyPostsService = (userId) => {
  return prisma.post.findMany({
    where: { authorId: userId },
  });
};

export const updatePostService = (id, data) => {
  return prisma.post.update({
    where: { id: Number(id) },
    data,
  });
};

export const deletePostService = (id) => {
  return prisma.post.delete({
    where: { id: Number(id) },
  });
};
