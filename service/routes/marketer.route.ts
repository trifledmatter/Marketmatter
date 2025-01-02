import { Router } from "express";
import {
  createMarketerHandler,
  getMarketerHandler,
  updateMarketerHandler,
  deleteMarketerHandler,
  listMarketersHandler,
} from "../controllers/marketer.controller";

const router = Router();

router.post("/", createMarketerHandler);
router.get("/:id", getMarketerHandler);
router.put("/:id", updateMarketerHandler);
router.delete("/:id", deleteMarketerHandler);
router.get("/", listMarketersHandler);

export default router;
