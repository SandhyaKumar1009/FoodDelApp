import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware (conceptual implementation)
 * In production, use Redis for distributed rate limiting
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false
});
