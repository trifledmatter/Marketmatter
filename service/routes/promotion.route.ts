import { Router } from "express";
import {
  createPromotionHandler,
  getPromotionHandler,
  updatePromotionHandler,
  deletePromotionHandler,
  listPromotionsHandler,
} from "../controllers/promotion.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();

router.use(authenticateToken);

router.post(
  "/promotions",
  [
    body("title").isString().withMessage("Title must be a string."),
    body("content").isString().withMessage("Content must be a string."),
    body("marketerId")
      .isString()
      .withMessage("marketerId must be a valid ObjectId."),
    body("targetCategories")
      .isArray()
      .withMessage("targetCategories must be an array of strings."),
    body("targetCategories.*")
      .isString()
      .withMessage("Each target category must be a string."),
    body("scheduledAt")
      .isISO8601()
      .withMessage("scheduledAt must be a valid date."),
    body("isActive").isBoolean().withMessage("isActive must be a boolean."),
  ],
  validate,
  createPromotionHandler
);

router.get("/promotions/:id", getPromotionHandler);

router.put(
  "/promotions/:id",
  [
    body("title").optional().isString().withMessage("Title must be a string."),
    body("content")
      .optional()
      .isString()
      .withMessage("Content must be a string."),
    body("marketerId")
      .optional()
      .isString()
      .withMessage("marketerId must be a valid ObjectId."),
    body("targetCategories")
      .optional()
      .isArray()
      .withMessage("targetCategories must be an array of strings."),
    body("targetCategories.*")
      .optional()
      .isString()
      .withMessage("Each target category must be a string."),
    body("scheduledAt")
      .optional()
      .isISO8601()
      .withMessage("scheduledAt must be a valid date."),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean."),
  ],
  validate,
  updatePromotionHandler
);

router.delete("/promotions/:id", deletePromotionHandler);

router.get("/promotions", listPromotionsHandler);

export default router;
