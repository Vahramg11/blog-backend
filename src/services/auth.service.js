import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export async function registerUser(email, password, username) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username, password: hashed },
  });

  return user;
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ userId: user.id });
  return { token, user };
}


export const getMeService = async (userId) => {
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true }, 
  }); 

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};