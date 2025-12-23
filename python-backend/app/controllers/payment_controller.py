# Payment Controller Layer
from flask import Blueprint, request, jsonify
from app.services.payment_service import PaymentService
from app.utils.auth_middleware import token_required

payment_bp = Blueprint('payment', __name__)
payment_service = PaymentService()


@payment_bp.route('/', methods=['POST'])
@token_required
def create_payment(current_user):
    """
    Create payment for order
    Expects: {
        "order_id": int,
        "payment_method": str (card/cash/upi)
    }
    """
    try:
        data = request.get_json()
        payment = payment_service.create_payment(data)
        return jsonify(payment), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to process payment'}), 500


@payment_bp.route('/<int:payment_id>', methods=['GET'])
@token_required
def get_payment(current_user, payment_id):
    """Get payment by ID"""
    try:
        payment = payment_service.get_payment_by_id(payment_id)
        return jsonify(payment), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch payment'}), 500


@payment_bp.route('/order/<int:order_id>', methods=['GET'])
@token_required
def get_payment_by_order(current_user, order_id):
    """Get payment for an order"""
    try:
        payment = payment_service.get_payment_by_order(order_id)
        return jsonify(payment), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch payment'}), 500
