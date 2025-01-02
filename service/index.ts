import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import subscriberRoutes from "./routes/subscriber.route";
import marketerRoutes from "./routes/marketer.route";
import promotionRoutes from "./routes/promotion.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/subscribers", subscriberRoutes);
app.use("/api/marketers", marketerRoutes);
app.use("/api/promotions", promotionRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Email Marketing Service is running.");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Endpoint not found." });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
