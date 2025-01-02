import { Router } from "express";
import {
  createSubscriberHandler,
  getSubscriberHandler,
  updateSubscriberHandler,
  deleteSubscriberHandler,
  listSubscribersHandler,
} from "../controllers/subscriber.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();

router.use(authenticateToken);

router.post(
  "/subscribers",
  [
    body("email").isEmail().withMessage("Invalid email address."),
    body("targetCategories")
      .isArray()
      .withMessage("targetCategories must be an array of strings."),
    body("targetCategories.*")
      .isString()
      .withMessage("Each target category must be a string."),
  ],
  validate,
  createSubscriberHandler
);

router.get("/subscribers/:id", getSubscriberHandler);

router.put(
  "/subscribers/:id",
  [
    body("email").optional().isEmail().withMessage("Invalid email address."),
    body("targetCategories")
      .optional()
      .isArray()
      .withMessage("targetCategories must be an array of strings."),
    body("targetCategories.*")
      .optional()
      .isString()
      .withMessage("Each target category must be a string."),
  ],
  validate,
  updateSubscriberHandler
);

router.delete("/subscribers/:id", deleteSubscriberHandler);

router.get("/subscribers", listSubscribersHandler);

export default router;
