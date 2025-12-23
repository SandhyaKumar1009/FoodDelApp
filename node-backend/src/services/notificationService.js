import pool from '../config/database.js';

class NotificationService {
  /**
   * Send notification to user
   */
  async sendNotification(data) {
    const { user_id, title, message, type } = data;

    // Validate required fields
    if (!user_id || !title || !message) {
      throw new Error('user_id, title, and message are required');
    }

    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, is_read)
       VALUES ($1, $2, $3, $4, false)
       RETURNING id, user_id, title, message, type, is_read, created_at`,
      [user_id, title, message, type || 'info']
    );

    // In a real system, this would trigger push notifications, SMS, etc.
    console.log(`📧 Notification sent to user ${user_id}: ${title}`);

    return result.rows[0];
  }

  /**
   * Get notifications for user
   */
  async getUserNotifications(userId) {
    const result = await pool.query(
      `SELECT id, user_id, title, message, type, is_read, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    return result.rows;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    const result = await pool.query(
      `UPDATE notifications
       SET is_read = true
       WHERE id = $1
       RETURNING id, user_id, title, message, is_read`,
      [notificationId]
    );

    if (result.rows.length === 0) {
      throw new Error('Notification not found');
    }

    return result.rows[0];
  }
}

export default NotificationService;
