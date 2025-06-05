import rateLimit from "express-rate-limit";

// Base configuration for rate limiters
const baseConfig = {
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

// General API limiter - 100 requests per minute
export const apiLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000, // 1 minute
  limit: 100,
  message: {
    error: "Too many requests from this IP, please try again after a minute",
  },
});

// Search endpoint limiter - more restrictive due to resource intensity
export const searchLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000, // 1 minute
  limit: 30, // 30 requests per minute
  message: {
    error: "Too many search requests, please try again after a minute",
  },
});

// Write operations limiter (POST, PUT, DELETE)
export const writeLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000, // 1 minute
  limit: 20, // 20 requests per minute
  message: {
    error: "Too many write operations, please try again after a minute",
  },
});

// User-specific endpoints limiter (if we implement user authentication later)
export const userLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 1000, // 1 minute
  limit: 50,
  message: {
    error:
      "Too many requests for user operations, please try again after a minute",
  },
});
