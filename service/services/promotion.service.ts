import prisma from "../utils/db";
import { type Promotion } from "@prisma/client";
import {
  type CreatePromotionInput,
  type UpdatePromotionInput,
} from "../models/promotion.model";

export const createPromotion = async (
  data: CreatePromotionInput
): Promise<Promotion> => {
  return await prisma.promotion.create({
    data,
  });
};

export const getPromotionById = async (
  id: string
): Promise<Promotion | null> => {
  return await prisma.promotion.findUnique({
    where: { id },
  });
};

export const updatePromotion = async (
  id: string,
  data: UpdatePromotionInput
): Promise<Promotion> => {
  return await prisma.promotion.update({
    where: { id },
    data,
  });
};

export const deletePromotion = async (id: string): Promise<Promotion> => {
  return await prisma.promotion.delete({
    where: { id },
  });
};

export const listPromotions = async (): Promise<Promotion[]> => {
  return await prisma.promotion.findMany({
    include: { marketer: true },
  });
};
