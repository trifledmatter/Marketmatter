import cookieParser from "cookie-parser";
import "dotenv/config";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import rateLimit from "express-rate-limit";

import morgan from "morgan";

import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/auth.route";
import marketerRoutes from "./routes/marketer.route";
import promotionRoutes from "./routes/promotion.route";
import subscriberRoutes from "./routes/subscriber.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

app.use("/api/auth", authLimiter);

app.use("/api", authRoutes);
app.use("/api", subscriberRoutes);
app.use("/api", marketerRoutes);
app.use("/api", promotionRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Email Marketing Service is running.");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint not found." });
});

app.use(errorHandler);

import prisma from "./utils/db";

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
