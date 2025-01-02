import { type Subscriber } from "@prisma/client";

export interface CreateSubscriberInput {
  email: string;
  targetCategories: string[];
}

export interface UpdateSubscriberInput {
  email?: string;
  targetCategories?: string[];
}

export type SubscriberModel = Subscriber;
