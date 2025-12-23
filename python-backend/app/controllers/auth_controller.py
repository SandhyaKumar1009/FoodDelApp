# Authentication Controller Layer
from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)
auth_service = AuthService()


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user
    Expects: { "name": str, "email": str, "password": str, "phone": str, "address": str }
    """
    try:
        data = request.get_json()
        result = auth_service.register_user(data)
        return jsonify(result), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login user
    Expects: { "email": str, "password": str }
    Returns: { "token": str, "user": dict }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body must be valid JSON'}), 400
        result = auth_service.login_user(data)
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        print(f"Login error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500


@auth_bp.route('/validate', methods=['POST'])
def validate_token():
    """
    Validate JWT token
    Expects: Authorization header with Bearer token
    """
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        result = auth_service.validate_token(token)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': 'Invalid token'}), 401
