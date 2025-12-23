import TrackingService from '../services/trackingService.js';

const service = new TrackingService();

class TrackingController {
  /**
   * Assign delivery partner to order
   * Expects: { "order_id": int, "partner_id": int }
   */
  async assignDeliveryPartner(req, res, next) {
    try {
      const data = req.body;
      const assignment = await service.assignDeliveryPartner(data);
      res.status(201).json(assignment);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get delivery assignment for order
   */
  async getDeliveryByOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const delivery = await service.getDeliveryByOrder(orderId);
      res.json(delivery);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update delivery status
   * Expects: { "status": "assigned" | "picked_up" | "in_transit" | "delivered" }
   */
  async updateDeliveryStatus(req, res, next) {
    try {
      const { assignmentId } = req.params;
      const { status } = req.body;
      const delivery = await service.updateDeliveryStatus(assignmentId, status);
      res.json(delivery);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get delivery location (partner's current location)
   */
  async getDeliveryLocation(req, res, next) {
    try {
      const { assignmentId } = req.params;
      const location = await service.getDeliveryLocation(assignmentId);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }
}

export default TrackingController;
