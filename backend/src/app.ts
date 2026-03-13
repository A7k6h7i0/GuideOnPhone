import "express-async-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { corsMiddleware } from "./config/cors.js";
import { rateLimiterMiddleware } from "./middlewares/rateLimiter.middleware.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

export const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "8mb" }));
app.use(rateLimiterMiddleware);
app.use(morgan("combined"));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "guide-on-phone-backend" });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);
