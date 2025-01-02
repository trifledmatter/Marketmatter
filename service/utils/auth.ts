import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./db";
import { type Marketer } from "@prisma/client";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (marketer: Marketer): string => {
  return jwt.sign(
    { userId: marketer.id, email: marketer.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const generateRefreshToken = async (
  marketer: Marketer
): Promise<string> => {
  const refreshToken = jwt.sign(
    { userId: marketer.id, email: marketer.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      marketerId: marketer.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return refreshToken;
};

export const verifyAccessToken = (token: string): any | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (
  token: string
): Promise<any | null> => {
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt < new Date()
    ) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  await prisma.refreshToken.updateMany({
    where: { token },
    data: { revoked: true },
  });
};
