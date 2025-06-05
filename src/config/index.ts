import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api",
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
  mongodb: {
    uri:
      process.env.MONGODB_URI?.replace(/\/[^/]*$/, "/sample_mflix") ||
      "mongodb://localhost:27017/sample_mflix",
    options: {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
} as const;

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredEnvVars = ["NODE_ENV"];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
};
