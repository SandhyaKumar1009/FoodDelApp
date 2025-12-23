import express from 'express';
import TrackingController from '../controllers/trackingController.js';

const router = express.Router();
const controller = new TrackingController();

// Assign delivery partner to order
router.post('/assign', controller.assignDeliveryPartner);

// Get delivery assignment for order
router.get('/order/:orderId', controller.getDeliveryByOrder);

// Update delivery status
router.put('/:assignmentId/status', controller.updateDeliveryStatus);

// Get delivery location
router.get('/:assignmentId/location', controller.getDeliveryLocation);

export default router;
