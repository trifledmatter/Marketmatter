import { type Request, type Response } from "express";
import {
  createPromotion,
  getPromotionById,
  updatePromotion,
  deletePromotion,
  listPromotions,
} from "../services/promotion.service";
import { getMarketerById } from "../services/marketer.service";
import { logEvent } from "../utils/log";

export const createPromotionHandler = async (req: Request, res: Response) => {
  const eventName = "createPromotion";
  logEvent(eventName, "Starting promotion creation.");

  try {
    const {
      title,
      content,
      marketerId,
      targetCategories,
      scheduledAt,
      isActive,
    } = req.body;

    logEvent(
      eventName,
      `Verifying existence of marketer with ID: ${marketerId}`
    );
    const marketer = await getMarketerById(marketerId);
    if (!marketer) {
      logEvent(
        eventName,
        "Invalid marketerId. Marketer does not exist.",
        "error"
      );
      return res
        .status(400)
        .json({ error: "Invalid marketerId. Marketer does not exist." });
    }

    const promotion = await createPromotion({
      title,
      content,
      marketerId,
      targetCategories,
      scheduledAt: new Date(scheduledAt),
      isActive,
    });
    logEvent(
      eventName,
      `Promotion created successfully: ${promotion.id}`,
      "success"
    );
    res.status(201).json(promotion);
  } catch (error: any) {
    logEvent(eventName, `Error creating promotion: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const getPromotionHandler = async (req: Request, res: Response) => {
  const eventName = "getPromotion";
  logEvent(eventName, "Fetching promotion details.");

  try {
    const { id } = req.params;
    const promotion = await getPromotionById(id);
    if (promotion) {
      logEvent(eventName, `Promotion found: ${promotion.id}`, "success");
      res.json(promotion);
    } else {
      logEvent(eventName, "Promotion not found.", "error");
      res.status(404).json({ error: "Promotion not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error fetching promotion: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const updatePromotionHandler = async (req: Request, res: Response) => {
  const eventName = "updatePromotion";
  logEvent(eventName, "Starting promotion update.");

  try {
    const { id } = req.params;
    const data = req.body;

    if (data.marketerId) {
      logEvent(
        eventName,
        `Verifying existence of marketer with ID: ${data.marketerId}`
      );
      const marketer = await getMarketerById(data.marketerId);
      if (!marketer) {
        logEvent(
          eventName,
          "Invalid marketerId. Marketer does not exist.",
          "error"
        );
        return res
          .status(400)
          .json({ error: "Invalid marketerId. Marketer does not exist." });
      }
    }

    if (data.scheduledAt) {
      logEvent(
        eventName,
        `Converting scheduledAt to Date object: ${data.scheduledAt}`
      );
      data.scheduledAt = new Date(data.scheduledAt);
    }

    const promotion = await updatePromotion(id, data);
    if (promotion) {
      logEvent(
        eventName,
        `Promotion updated successfully: ${promotion.id}`,
        "success"
      );
      res.json(promotion);
    } else {
      logEvent(eventName, "Promotion not found for update.", "error");
      res.status(404).json({ error: "Promotion not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error updating promotion: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const deletePromotionHandler = async (req: Request, res: Response) => {
  const eventName = "deletePromotion";
  logEvent(eventName, "Initiating promotion deletion.");

  try {
    const { id } = req.params;
    const promotion = await deletePromotion(id);
    if (promotion) {
      logEvent(
        eventName,
        `Promotion deleted successfully: ${promotion.id}`,
        "success"
      );
      res.json({ message: "Promotion deleted successfully.", promotion });
    } else {
      logEvent(eventName, "Promotion not found for deletion.", "error");
      res.status(404).json({ error: "Promotion not found." });
    }
  } catch (error: any) {
    logEvent(eventName, `Error deleting promotion: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};

export const listPromotionsHandler = async (req: Request, res: Response) => {
  const eventName = "listPromotions";
  logEvent(eventName, "Retrieving list of promotions.");

  try {
    const promotions = await listPromotions();
    logEvent(
      eventName,
      `Retrieved ${promotions.length} promotions.`,
      "success"
    );
    res.json(promotions);
  } catch (error: any) {
    logEvent(eventName, `Error listing promotions: ${error.message}`, "error");
    res.status(500).json({ error: error.message });
  }
};
