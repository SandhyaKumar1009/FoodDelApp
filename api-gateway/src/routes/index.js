import express from 'express';
import { createProxyHandler } from '../proxy/proxyHandler.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// ========================================
// PYTHON BACKEND ROUTES
// ========================================

// User routes
router.use('/users', rateLimiter, createProxyHandler('python', '/api/users'));

// Restaurant routes
router.use('/restaurants', rateLimiter, createProxyHandler('python', '/api/restaurants'));

// Menu routes
router.use('/menu', rateLimiter, createProxyHandler('python', '/api/menu'));

// Order routes
router.use('/orders', rateLimiter, createProxyHandler('python', '/api/orders'));

// Payment routes
router.use('/payments', rateLimiter, createProxyHandler('python', '/api/payments'));

// Auth routes
router.use('/auth', rateLimiter, createProxyHandler('python', '/api/auth'));

// ========================================
// NODE BACKEND ROUTES
// ========================================

// Delivery partner routes
router.use('/delivery-partners', rateLimiter, createProxyHandler('node', '/api/delivery-partners'));

// Tracking routes
router.use('/tracking', rateLimiter, createProxyHandler('node', '/api/tracking'));

// Notification routes
router.use('/notifications', rateLimiter, createProxyHandler('node', '/api/notifications'));

export default router;
