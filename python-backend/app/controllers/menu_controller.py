# Menu Controller Layer
from flask import Blueprint, request, jsonify
from app.services.menu_service import MenuService

menu_bp = Blueprint('menu', __name__)
menu_service = MenuService()


@menu_bp.route('/restaurant/<int:restaurant_id>', methods=['GET'])
def get_menu_by_restaurant(restaurant_id):
    """Get all menu items for a restaurant"""
    try:
        menu_items = menu_service.get_menu_by_restaurant(restaurant_id)
        return jsonify(menu_items), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch menu'}), 500


@menu_bp.route('/<int:item_id>', methods=['GET'])
def get_menu_item(item_id):
    """Get menu item by ID"""
    try:
        item = menu_service.get_menu_item_by_id(item_id)
        return jsonify(item), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch menu item'}), 500


@menu_bp.route('/', methods=['POST'])
def create_menu_item():
    """Create new menu item (Restaurant owner only - simplified)"""
    try:
        data = request.get_json()
        item = menu_service.create_menu_item(data)
        return jsonify(item), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to create menu item'}), 500
