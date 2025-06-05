import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "../config";

export const setupCommonMiddleware = (app: express.Application): void => {
  // Security middleware
  app.use(helmet());

  // CORS setup
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware - use only in development
  if (config.env === "development") {
    app.use(morgan("dev"));
  }
};
