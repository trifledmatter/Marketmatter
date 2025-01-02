import { Router } from "express";
import {
  createMarketerHandler,
  getMarketerHandler,
  updateMarketerHandler,
  deleteMarketerHandler,
  listMarketersHandler,
} from "../controllers/marketer.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();

router.use(authenticateToken);

router.post(
  "/marketers",
  [
    body("name").isString().withMessage("Name must be a string."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("company")
      .optional()
      .isString()
      .withMessage("Company must be a string."),
    body("bio").optional().isString().withMessage("Bio must be a string."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  validate,
  createMarketerHandler
);

router.get("/marketers/:id", getMarketerHandler);

router.put(
  "/marketers/:id",
  [
    body("name").optional().isString().withMessage("Name must be a string."),
    body("email").optional().isEmail().withMessage("Invalid email address."),
    body("company")
      .optional()
      .isString()
      .withMessage("Company must be a string."),
    body("bio").optional().isString().withMessage("Bio must be a string."),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  validate,
  updateMarketerHandler
);

router.delete("/marketers/:id", deleteMarketerHandler);

router.get("/marketers", listMarketersHandler);

export default router;
