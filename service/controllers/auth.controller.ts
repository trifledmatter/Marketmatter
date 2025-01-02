import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import {
  registerMarketer,
  authenticateMarketer,
  refreshAccessToken,
  logoutMarketer,
} from "../services/auth.service";
import { logEvent } from "../utils/log";

/**
 * @desc    Register a new marketer
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const eventName = "registerMarketer";
    logEvent(eventName, "Starting marketer registration.");

    const { name, email, company, bio, password } = req.body;

    if (!name || !email || !password) {
      logEvent(
        eventName,
        "Missing required fields: name, email, password.",
        "error"
      );
      res.status(400);
      throw new Error("Name, email, and password are required.");
    }

    try {
      const marketer = await registerMarketer(
        name,
        email,
        company,
        bio,
        password
      );
      logEvent(
        eventName,
        `Marketer registered successfully: ${marketer.id}`,
        "success"
      );
      res
        .status(201)
        .json({ message: "Marketer registered successfully.", marketer });
    } catch (error: any) {
      logEvent(
        eventName,
        `Error registering marketer: ${error.message}`,
        "error"
      );
      res.status(400).json({ error: error.message });
    }
  }
);

/**
 * @desc    Login a marketer
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const eventName = "loginMarketer";
    logEvent(eventName, "Starting marketer login.");

    const { email, password } = req.body;

    const tokens = await authenticateMarketer(email, password);
    if (!tokens) {
      logEvent(eventName, "Invalid email or password.", "error");
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    logEvent(eventName, `Marketer logged in successfully: ${email}`, "success");
    res.json(tokens);
  }
);

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh-token
 * @access  Public
 */
export const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const eventName = "refreshToken";
    logEvent(eventName, "Starting token refresh.");

    const { refreshToken } = req.body;

    if (!refreshToken) {
      logEvent(eventName, "Refresh token is missing.", "error");
      res.status(400).json({ error: "Refresh token is required." });
      return;
    }

    const tokens = await refreshAccessToken(refreshToken);
    if (!tokens) {
      logEvent(eventName, "Invalid or expired refresh token.", "error");
      res.status(401).json({ error: "Invalid or expired refresh token." });
      return;
    }

    logEvent(eventName, "Token refreshed successfully.", "success");
    res.json(tokens);
  }
);

/**
 * @desc    Logout a marketer
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logoutHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const eventName = "logoutMarketer";
    logEvent(eventName, "Starting logout process.");

    const { refreshToken } = req.body;

    if (!refreshToken) {
      logEvent(eventName, "Refresh token is missing.", "error");
      res.status(400).json({ error: "Refresh token is required." });
      return;
    }

    await logoutMarketer(refreshToken);
    logEvent(eventName, "Marketer logged out successfully.", "success");
    res.json({ message: "Logged out successfully." });
  }
);
