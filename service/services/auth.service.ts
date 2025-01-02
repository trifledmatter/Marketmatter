import prisma from "../utils/db";
import {
  hashPassword,
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from "../utils/auth";
import { type Marketer } from "@prisma/client";

export const registerMarketer = async (
  name: string,
  email: string,
  company: string | undefined,
  bio: string | undefined,
  password: string
): Promise<Marketer> => {
  const existingMarketer = await prisma.marketer.findUnique({
    where: { email },
  });
  if (existingMarketer) {
    throw new Error("Marketer with this email already exists.");
  }

  const passwordHash = await hashPassword(password);

  const marketer = await prisma.marketer.create({
    data: {
      name,
      email,
      company,
      bio: bio ?? "No description provided",
      passwordHash,
    },
  });

  return marketer;
};

export const authenticateMarketer = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const marketer = await prisma.marketer.findUnique({
    where: { email },
  });

  if (!marketer) {
    return null;
  }

  const isPasswordValid = await comparePasswords(
    password,
    marketer.passwordHash
  );
  if (!isPasswordValid) {
    return null;
  }

  const accessToken = generateAccessToken(marketer);
  const refreshToken = await generateRefreshToken(marketer);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (
  token: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const payload = await verifyRefreshToken(token);
  if (!payload) {
    return null;
  }

  const marketer = await prisma.marketer.findUnique({
    where: { id: payload.userId },
  });

  if (!marketer) {
    return null;
  }

  await revokeRefreshToken(token);

  const newAccessToken = generateAccessToken(marketer);
  const newRefreshToken = await generateRefreshToken(marketer);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutMarketer = async (token: string): Promise<void> => {
  await revokeRefreshToken(token);
};
