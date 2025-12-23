# Restaurant Controller Layer
from flask import Blueprint, request, jsonify
from app.services.restaurant_service import RestaurantService

restaurant_bp = Blueprint('restaurant', __name__)
restaurant_service = RestaurantService()


@restaurant_bp.route('/', methods=['GET'])
def get_all_restaurants():
    """Get all active restaurants"""
    try:
        restaurants = restaurant_service.get_all_restaurants()
        return jsonify(restaurants), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch restaurants'}), 500


@restaurant_bp.route('/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    """Get restaurant by ID"""
    try:
        restaurant = restaurant_service.get_restaurant_by_id(restaurant_id)
        return jsonify(restaurant), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch restaurant'}), 500


@restaurant_bp.route('/', methods=['POST'])
def create_restaurant():
    """Create new restaurant (Admin only - simplified for now)"""
    try:
        data = request.get_json()
        restaurant = restaurant_service.create_restaurant(data)
        return jsonify(restaurant), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to create restaurant'}), 500
