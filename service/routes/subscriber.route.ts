import { Router } from "express";
import {
  createSubscriberHandler,
  getSubscriberHandler,
  updateSubscriberHandler,
  deleteSubscriberHandler,
  listSubscribersHandler,
} from "../controllers/subscriber.controller";

const router = Router();

router.post("/", createSubscriberHandler);
router.get("/:id", getSubscriberHandler);
router.put("/:id", updateSubscriberHandler);
router.delete("/:id", deleteSubscriberHandler);
router.get("/", listSubscribersHandler);

export default router;
