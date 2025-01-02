import { type Marketer } from "@prisma/client";

export interface CreateMarketerInput {
  name: string;
  email: string;
  company?: string;
  bio: string;
}

export interface UpdateMarketerInput {
  name?: string;
  email?: string;
  company?: string;
  bio?: string;
}

export type MarketerModel = Marketer;
