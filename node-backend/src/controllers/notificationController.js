import NotificationService from '../services/notificationService.js';

const service = new NotificationService();

class NotificationController {
  /**
   * Send notification to user
   * Expects: { "user_id": int, "title": str, "message": str, "type": str }
   */
  async sendNotification(req, res, next) {
    try {
      const data = req.body;
      const notification = await service.sendNotification(data);
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get notifications for user
   */
  async getUserNotifications(req, res, next) {
    try {
      const { userId } = req.params;
      const notifications = await service.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(req, res, next) {
    try {
      const { notificationId } = req.params;
      const notification = await service.markAsRead(notificationId);
      res.json(notification);
    } catch (error) {
      next(error);
    }
  }
}

export default NotificationController;
