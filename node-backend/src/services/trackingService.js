import pool from '../config/database.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class TrackingService {
  /**
   * Assign delivery partner to order
   * Also updates order status in Python backend
   */
  async assignDeliveryPartner(data) {
    const { order_id, partner_id } = data;

    if (!order_id || !partner_id) {
      throw new Error('order_id and partner_id are required');
    }

    // Check if order already has assignment
    const existing = await pool.query(
      'SELECT id FROM delivery_assignments WHERE order_id = $1',
      [order_id]
    );

    if (existing.rows.length > 0) {
      throw new Error('Order already has a delivery partner assigned');
    }

    // Check if partner is available
    const partnerCheck = await pool.query(
      'SELECT status FROM delivery_partners WHERE id = $1',
      [partner_id]
    );

    if (partnerCheck.rows.length === 0) {
      throw new Error('Delivery partner not found');
    }

    if (partnerCheck.rows[0].status !== 'available') {
      throw new Error('Delivery partner is not available');
    }

    // Create assignment
    const result = await pool.query(
      `INSERT INTO delivery_assignments (order_id, partner_id, status)
       VALUES ($1, $2, 'assigned')
       RETURNING id, order_id, partner_id, status, created_at`,
      [order_id, partner_id]
    );

    // Update partner status to busy
    await pool.query(
      'UPDATE delivery_partners SET status = $1 WHERE id = $2',
      ['busy', partner_id]
    );

    // Communicate with Python backend to update order status
    try {
      await axios.put(
        `${process.env.PYTHON_BACKEND_URL}/api/orders/${order_id}/status`,
        { status: 'ready' }
      );
    } catch (error) {
      console.error('Failed to update order status in Python backend:', error.message);
    }

    return result.rows[0];
  }

  /**
   * Get delivery assignment for order
   */
  async getDeliveryByOrder(orderId) {
    const result = await pool.query(
      `SELECT da.id, da.order_id, da.partner_id, da.status, da.created_at, da.updated_at,
              dp.name as partner_name, dp.phone as partner_phone, dp.vehicle_type,
              dp.current_latitude, dp.current_longitude
       FROM delivery_assignments da
       JOIN delivery_partners dp ON da.partner_id = dp.id
       WHERE da.order_id = $1`,
      [orderId]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery assignment not found for this order');
    }

    return result.rows[0];
  }

  /**
   * Update delivery status
   */
  async updateDeliveryStatus(assignmentId, status) {
    const validStatuses = ['assigned', 'picked_up', 'in_transit', 'delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const result = await pool.query(
      `UPDATE delivery_assignments
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, order_id, partner_id, status`,
      [status, assignmentId]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery assignment not found');
    }

    const assignment = result.rows[0];

    // If delivered, update order status and partner availability
    if (status === 'delivered') {
      // Update order status in Python backend
      try {
        await axios.put(
          `${process.env.PYTHON_BACKEND_URL}/api/orders/${assignment.order_id}/status`,
          { status: 'delivered' }
        );
      } catch (error) {
        console.error('Failed to update order status:', error.message);
      }

      // Make partner available again
      await pool.query(
        'UPDATE delivery_partners SET status = $1 WHERE id = $2',
        ['available', assignment.partner_id]
      );
    }

    return assignment;
  }

  /**
   * Get delivery location (partner's current location)
   */
  async getDeliveryLocation(assignmentId) {
    const result = await pool.query(
      `SELECT da.id, da.order_id, dp.current_latitude, dp.current_longitude, da.status
       FROM delivery_assignments da
       JOIN delivery_partners dp ON da.partner_id = dp.id
       WHERE da.id = $1`,
      [assignmentId]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery assignment not found');
    }

    return result.rows[0];
  }
}

export default TrackingService;
