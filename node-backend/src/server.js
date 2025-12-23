import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import deliveryPartnerRoutes from './routes/deliveryPartnerRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 4000;

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors({ origin: FRONTEND_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ========================================
// ROUTES
// ========================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'node-backend',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/delivery-partners', deliveryPartnerRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`✅ Node Backend running on port ${PORT}`);
  console.log(`📡 Python Backend: ${process.env.PYTHON_BACKEND_URL}`);
});
