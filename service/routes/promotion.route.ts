import { Router } from "express";
import {
  createPromotionHandler,
  getPromotionHandler,
  updatePromotionHandler,
  deletePromotionHandler,
  listPromotionsHandler,
} from "../controllers/promotion.controller";

const router = Router();

router.post("/", createPromotionHandler);
router.get("/:id", getPromotionHandler);
router.put("/:id", updatePromotionHandler);
router.delete("/:id", deletePromotionHandler);
router.get("/", listPromotionsHandler);

export default router;
