import prisma from "../utils/db";
import { type Subscriber } from "@prisma/client";
import {
  type CreateSubscriberInput,
  type UpdateSubscriberInput,
} from "../models/subscriber.model";

export const createSubscriber = async (
  data: CreateSubscriberInput
): Promise<Subscriber> => {
  return await prisma.subscriber.create({
    data,
  });
};

export const getSubscriberById = async (
  id: string
): Promise<Subscriber | null> => {
  return await prisma.subscriber.findUnique({
    where: { id },
  });
};

export const getSubscriberByEmail = async (
  email: string
): Promise<Subscriber | null> => {
  return await prisma.subscriber.findUnique({
    where: { email },
  });
};

export const updateSubscriber = async (
  id: string,
  data: UpdateSubscriberInput
): Promise<Subscriber> => {
  return await prisma.subscriber.update({
    where: { id },
    data,
  });
};

export const deleteSubscriber = async (id: string): Promise<Subscriber> => {
  return await prisma.subscriber.delete({
    where: { id },
  });
};

export const listSubscribers = async (): Promise<Subscriber[]> => {
  return await prisma.subscriber.findMany();
};
