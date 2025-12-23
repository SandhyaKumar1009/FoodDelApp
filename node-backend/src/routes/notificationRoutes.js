import express from 'express';
import NotificationController from '../controllers/notificationController.js';

const router = express.Router();
const controller = new NotificationController();

// Send notification to user
router.post('/send', controller.sendNotification);

// Get notifications for user
router.get('/user/:userId', controller.getUserNotifications);

// Mark notification as read
router.put('/:notificationId/read', controller.markAsRead);

export default router;
