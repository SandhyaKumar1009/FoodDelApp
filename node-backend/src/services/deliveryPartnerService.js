import pool from '../config/database.js';

class DeliveryPartnerService {
  /**
   * Get all available delivery partners
   */
  async getAvailablePartners() {
    const result = await pool.query(
      `SELECT id, name, phone, vehicle_type, status, current_latitude, current_longitude
       FROM delivery_partners
       WHERE status = 'available'
       ORDER BY id`
    );
    return result.rows;
  }

  /**
   * Get delivery partner by ID
   */
  async getPartnerById(id) {
    const result = await pool.query(
      `SELECT id, name, phone, vehicle_type, status, current_latitude, current_longitude, created_at
       FROM delivery_partners
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery partner not found');
    }

    return result.rows[0];
  }

  /**
   * Register new delivery partner
   */
  async registerPartner(data) {
    const { name, phone, vehicle_type } = data;

    // Validate required fields
    if (!name || !phone || !vehicle_type) {
      throw new Error('Name, phone, and vehicle_type are required');
    }

    const result = await pool.query(
      `INSERT INTO delivery_partners (name, phone, vehicle_type, status)
       VALUES ($1, $2, $3, 'offline')
       RETURNING id, name, phone, vehicle_type, status, created_at`,
      [name, phone, vehicle_type]
    );

    return result.rows[0];
  }

  /**
   * Update delivery partner status
   */
  async updatePartnerStatus(id, status) {
    const validStatuses = ['available', 'busy', 'offline'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const result = await pool.query(
      `UPDATE delivery_partners
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, name, phone, vehicle_type, status`,
      [status, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery partner not found');
    }

    return result.rows[0];
  }

  /**
   * Update delivery partner location
   */
  async updatePartnerLocation(id, latitude, longitude) {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude are required');
    }

    const result = await pool.query(
      `UPDATE delivery_partners
       SET current_latitude = $1, current_longitude = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, name, current_latitude, current_longitude`,
      [latitude, longitude, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Delivery partner not found');
    }

    return result.rows[0];
  }
}

export default DeliveryPartnerService;
