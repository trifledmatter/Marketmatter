import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  refreshTokenHandler,
  logoutHandler,
} from "../controllers/auth.controller";
import { body } from "express-validator";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/auth/register",
  [
    body("name").isString().withMessage("Name must be a string."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("company")
      .optional()
      .isString()
      .withMessage("Company must be a string."),
    body("bio").optional().isString().withMessage("Bio must be a string."),
  ],
  validate,
  registerHandler
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Invalid email address."),
    body("password").exists().withMessage("Password is required."),
  ],
  validate,
  loginHandler
);

router.post(
  "/auth/refresh-token",
  [
    body("refreshToken")
      .isString()
      .withMessage("Refresh token must be a string."),
  ],
  validate,
  refreshTokenHandler
);

router.post(
  "/auth/logout",
  [
    body("refreshToken")
      .isString()
      .withMessage("Refresh token must be a string."),
  ],
  validate,
  logoutHandler
);

export default router;
