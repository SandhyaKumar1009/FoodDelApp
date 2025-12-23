import DeliveryPartnerService from '../services/deliveryPartnerService.js';

const service = new DeliveryPartnerService();

class DeliveryPartnerController {
  /**
   * Get all available delivery partners
   */
  async getAvailablePartners(req, res, next) {
    try {
      const partners = await service.getAvailablePartners();
      res.json(partners);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get delivery partner by ID
   */
  async getPartnerById(req, res, next) {
    try {
      const { id } = req.params;
      const partner = await service.getPartnerById(id);
      res.json(partner);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Register new delivery partner
   * Expects: { "name": str, "phone": str, "vehicle_type": str }
   */
  async registerPartner(req, res, next) {
    try {
      const data = req.body;
      const partner = await service.registerPartner(data);
      res.status(201).json(partner);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update delivery partner status
   * Expects: { "status": "available" | "busy" | "offline" }
   */
  async updatePartnerStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const partner = await service.updatePartnerStatus(id, status);
      res.json(partner);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update delivery partner location
   * Expects: { "latitude": float, "longitude": float }
   */
  async updatePartnerLocation(req, res, next) {
    try {
      const { id } = req.params;
      const { latitude, longitude } = req.body;
      const partner = await service.updatePartnerLocation(id, latitude, longitude);
      res.json(partner);
    } catch (error) {
      next(error);
    }
  }
}

export default DeliveryPartnerController;
