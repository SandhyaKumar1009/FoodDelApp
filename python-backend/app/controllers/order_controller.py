# Order Controller Layer
from flask import Blueprint, request, jsonify
from app.services.order_service import OrderService
from app.utils.auth_middleware import token_required

order_bp = Blueprint('order', __name__)
order_service = OrderService()


@order_bp.route('/', methods=['POST'])
@token_required
def create_order(current_user):
    """
    Create new order
    Expects: {
        "restaurant_id": int,
        "items": [{"menu_item_id": int, "quantity": int}],
        "delivery_address": str
    }
    """
    try:
        data = request.get_json()
        data['user_id'] = current_user['id']
        order = order_service.create_order(data)
        return jsonify(order), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to create order'}), 500


@order_bp.route('/<int:order_id>', methods=['GET'])
@token_required
def get_order(current_user, order_id):
    """Get order by ID"""
    try:
        order = order_service.get_order_by_id(order_id)
        
        # Ensure user can only view their own orders
        if order['user_id'] != current_user['id']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(order), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch order'}), 500


@order_bp.route('/user/<int:user_id>', methods=['GET'])
@token_required
def get_user_orders(current_user, user_id):
    """Get all orders for a user"""
    try:
        if current_user['id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        orders = order_service.get_orders_by_user(user_id)
        return jsonify(orders), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch orders'}), 500


@order_bp.route('/<int:order_id>/status', methods=['PUT'])
@token_required
def update_order_status(current_user, order_id):
    """Update order status"""
    try:
        data = request.get_json()
        order = order_service.update_order_status(order_id, data.get('status'))
        return jsonify(order), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to update order'}), 500
