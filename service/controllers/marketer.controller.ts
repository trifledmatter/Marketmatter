import { type Request, type Response } from "express";
import {
  createMarketer,
  getMarketerById,
  getMarketerByEmail,
  updateMarketer,
  deleteMarketer,
  listMarketers,
} from "../services/marketer.service";
import { logEvent } from "../utils/log";

export const createMarketerHandler = async (req: Request, res: Response) => {
  const eventName = "createMarketer";
  logEvent(eventName, "Starting marketer creation.");

  try {
    const { name, email, company, bio } = req.body;
    const existingMarketer = await getMarketerByEmail(email);
    if (existingMarketer) {
      logEvent(eventName, "Marketer with this email already exists.", "error");
      return res
        .status(400)
        .json({ error: "Marketer with this email already exists." });
    }
    const marketer = await createMarketer({ name, email, company, bio });
    logEvent(
      eventName,
      `Marketer created successfully: ${marketer.id}`,
      "success"
    );
    res.status(201).json(marketer);
  } catch (error: any) {
    logEvent(eventName, `Error creating marketer: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const getMarketerHandler = async (req: Request, res: Response) => {
  const eventName = "getMarketer";
  logEvent(eventName, "Fetching marketer details.");

  try {
    const { id } = req.params;
    const marketer = await getMarketerById(id);
    if (marketer) {
      logEvent(eventName, `Marketer found: ${marketer.id}`, "success");
      res.json(marketer);
    } else {
      logEvent(eventName, "Marketer not found.", "error");
      res.status(404).json({ error: "Marketer not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error fetching marketer: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const updateMarketerHandler = async (req: Request, res: Response) => {
  const eventName = "updateMarketer";
  logEvent(eventName, "Starting marketer update.");

  try {
    const { id } = req.params;
    const data = req.body;
    const marketer = await updateMarketer(id, data);
    if (marketer) {
      logEvent(
        eventName,
        `Marketer updated successfully: ${marketer.id}`,
        "success"
      );
      res.json(marketer);
    } else {
      logEvent(eventName, "Marketer not found for update.", "error");
      res.status(404).json({ error: "Marketer not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error updating marketer: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const deleteMarketerHandler = async (req: Request, res: Response) => {
  const eventName = "deleteMarketer";
  logEvent(eventName, "Initiating marketer deletion.");

  try {
    const { id } = req.params;
    const marketer = await deleteMarketer(id);
    if (marketer) {
      logEvent(
        eventName,
        `Marketer deleted successfully: ${marketer.id}`,
        "success"
      );
      res.json({ message: "Marketer deleted successfully.", marketer });
    } else {
      logEvent(eventName, "Marketer not found for deletion.", "error");
      res.status(404).json({ error: "Marketer not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error deleting marketer: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const listMarketersHandler = async (req: Request, res: Response) => {
  const eventName = "listMarketers";
  logEvent(eventName, "Retrieving list of marketers.");

  try {
    const marketers = await listMarketers();
    logEvent(eventName, `Retrieved ${marketers.length} marketers.`, "success");
    res.json(marketers);
  } catch (error: any) {
    logEvent(eventName, `Error listing marketers: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};
