import prisma from "../utils/db";
import { type Marketer } from "@prisma/client";
import {
  type CreateMarketerInput,
  type UpdateMarketerInput,
} from "../models/marketer.model";

export const createMarketer = async (
  data: CreateMarketerInput
): Promise<Marketer> => {
  return await prisma.marketer.create({
    data,
  });
};

export const getMarketerById = async (id: string): Promise<Marketer | null> => {
  return await prisma.marketer.findUnique({
    where: { id },
  });
};

export const getMarketerByEmail = async (
  email: string
): Promise<Marketer | null> => {
  return await prisma.marketer.findUnique({
    where: { email },
  });
};

export const updateMarketer = async (
  id: string,
  data: UpdateMarketerInput
): Promise<Marketer> => {
  return await prisma.marketer.update({
    where: { id },
    data,
  });
};

export const deleteMarketer = async (id: string): Promise<Marketer> => {
  return await prisma.marketer.delete({
    where: { id },
  });
};

export const listMarketers = async (): Promise<Marketer[]> => {
  return await prisma.marketer.findMany({
    include: { promotions: true },
  });
};
