import { type Request, type Response } from "express";
import {
  createSubscriber,
  getSubscriberById,
  getSubscriberByEmail,
  updateSubscriber,
  deleteSubscriber,
  listSubscribers,
} from "../services/subscriber.service";
import { logEvent } from "../utils/log";

export const createSubscriberHandler = async (req: Request, res: Response) => {
  const eventName = "createSubscriber";
  logEvent(eventName, "Starting subscriber creation.");

  try {
    const { email, targetCategories } = req.body;
    logEvent(eventName, `Received email: ${email}`);

    const existingSubscriber = await getSubscriberByEmail(email);
    if (existingSubscriber) {
      logEvent(
        eventName,
        "Subscriber with this email already exists.",
        "error"
      );
      return res
        .status(400)
        .json({ error: "Subscriber with this email already exists." });
    }

    const subscriber = await createSubscriber({ email, targetCategories });
    logEvent(
      eventName,
      `Subscriber created successfully: ${subscriber.id}`,
      "success"
    );
    res.status(201).json(subscriber);
  } catch (error: any) {
    logEvent(eventName, `Error creating subscriber: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const getSubscriberHandler = async (req: Request, res: Response) => {
  const eventName = "getSubscriber";
  logEvent(eventName, "Fetching subscriber details.");

  try {
    const { id } = req.params;
    logEvent(eventName, `Received subscriber ID: ${id}`);

    const subscriber = await getSubscriberById(id);
    if (subscriber) {
      logEvent(eventName, `Subscriber found: ${subscriber.id}`, "success");
      res.json(subscriber);
    } else {
      logEvent(eventName, "Subscriber not found.", "error");
      res.status(404).json({ error: "Subscriber not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error fetching subscriber: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const updateSubscriberHandler = async (req: Request, res: Response) => {
  const eventName = "updateSubscriber";
  logEvent(eventName, "Starting subscriber update.");

  try {
    const { id } = req.params;
    const data = req.body;
    logEvent(eventName, `Received update data for subscriber ID: ${id}`);

    const subscriber = await updateSubscriber(id, data);
    if (subscriber) {
      logEvent(
        eventName,
        `Subscriber updated successfully: ${subscriber.id}`,
        "success"
      );
      res.json(subscriber);
    } else {
      logEvent(eventName, "Subscriber not found for update.", "error");
      res.status(404).json({ error: "Subscriber not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error updating subscriber: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubscriberHandler = async (req: Request, res: Response) => {
  const eventName = "deleteSubscriber";
  logEvent(eventName, "Initiating subscriber deletion.");

  try {
    const { id } = req.params;
    logEvent(eventName, `Received subscriber ID for deletion: ${id}`);

    const subscriber = await deleteSubscriber(id);
    if (subscriber) {
      logEvent(
        eventName,
        `Subscriber deleted successfully: ${subscriber.id}`,
        "success"
      );
      res.json({ message: "Subscriber deleted successfully.", subscriber });
    } else {
      logEvent(eventName, "Subscriber not found for deletion.", "error");
      res.status(404).json({ error: "Subscriber not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error deleting subscriber: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const listSubscribersHandler = async (req: Request, res: Response) => {
  const eventName = "listSubscribers";
  logEvent(eventName, "Retrieving list of subscribers.");

  try {
    const subscribers = await listSubscribers();
    logEvent(
      eventName,
      `Retrieved ${subscribers.length} subscribers.`,
      "success"
    );
    res.json(subscribers);
  } catch (error: any) {
    logEvent(eventName, `Error listing subscribers: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};
