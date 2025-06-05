import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import {
  defaultRateLimiter,
  dynamicRateLimiter,
} from "./config/rate-limit.config";
import v1Router from "./routes/v1";

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parsing middleware with size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Apply default rate limiting to all routes
app.use(defaultRateLimiter);

// Apply dynamic rate limiting to API routes
app.use("/api", dynamicRateLimiter);

// API routes
app.use("/api/v1", v1Router);

// Health check endpoint (not rate limited)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
