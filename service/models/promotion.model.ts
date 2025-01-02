import { type Promotion } from "@prisma/client";

export interface CreatePromotionInput {
  title: string;
  content: string;
  marketerId: string;
  targetCategories: string[];
  scheduledAt: Date;
  isActive?: boolean;
}

export interface UpdatePromotionInput {
  title?: string;
  content?: string;
  marketerId?: string;
  targetCategories?: string[];
  scheduledAt?: Date;
  isActive?: boolean;
}

export type PromotionModel = Promotion;
