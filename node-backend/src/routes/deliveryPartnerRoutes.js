import express from 'express';
import DeliveryPartnerController from '../controllers/deliveryPartnerController.js';

const router = express.Router();
const controller = new DeliveryPartnerController();

// Get all available delivery partners
router.get('/available', controller.getAvailablePartners);

// Get delivery partner by ID
router.get('/:id', controller.getPartnerById);

// Register new delivery partner
router.post('/register', controller.registerPartner);

// Update delivery partner status
router.put('/:id/status', controller.updatePartnerStatus);

// Update delivery partner location
router.put('/:id/location', controller.updatePartnerLocation);

export default router;
