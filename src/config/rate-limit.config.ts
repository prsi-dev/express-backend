import rateLimit from "express-rate-limit";
import { NextFunction, Request, Response } from "express";

interface RateLimitConfig {
  windowMs: number;
  limit: number;
  message: string;
}

// Different rate limit tiers
const rateLimitTiers: Record<string, RateLimitConfig> = {
  free: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // 100 requests per 15 minutes
    message: "Free tier rate limit exceeded. Please try again later.",
  },
  basic: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 500, // 500 requests per 15 minutes
    message: "Basic tier rate limit exceeded. Please try again later.",
  },
  premium: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 2000, // 2000 requests per 15 minutes
    message: "Premium tier rate limit exceeded. Please try again later.",
  },
};

// Helper to determine user tier from request
// This can be expanded based on your authentication/authorization system
const getUserTier = (_req: Request): string => {
  // TODO: Implement proper tier detection based on user authentication
  // For now, return 'free' tier
  return "free";
};

// Create rate limiter middleware factory
export const createRateLimiter = (tier: string = "free") => {
  const config = rateLimitTiers[tier] || rateLimitTiers.free;

  return rateLimit({
    windowMs: config.windowMs,
    limit: config.limit,
    message: { error: config.message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request): string => {
      // Use IP address as default key
      const ip =
        req.ip ||
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "unknown";

      // You can extend this to include user ID or other identifiers
      return ip;
    },
    handler: (req: Request, res: Response): void => {
      res.status(429).json({
        error: config.message,
        retryAfter: Math.ceil(config.windowMs / 1000 / 60), // minutes
      });
    },
    skip: (req: Request): boolean => {
      // Skip rate limiting for certain conditions
      // Example: Skip for health checks or internal requests
      return req.path === "/health" || req.ip === "127.0.0.1";
    },
  });
};

// Dynamic rate limiter that adjusts based on user tier
export const dynamicRateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tier = getUserTier(req);
  const limiter = createRateLimiter(tier);
  limiter(req, res, next);
};

// Default rate limiter with free tier settings
export const defaultRateLimiter = createRateLimiter("free");
