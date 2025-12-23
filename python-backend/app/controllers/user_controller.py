# User Controller Layer
from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.utils.auth_middleware import token_required

user_bp = Blueprint('user', __name__)
user_service = UserService()


@user_bp.route('/<int:user_id>', methods=['GET'])
@token_required
def get_user(current_user, user_id):
    """Get user by ID"""
    try:
        user = user_service.get_user_by_id(user_id)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch user'}), 500


@user_bp.route('/<int:user_id>', methods=['PUT'])
@token_required
def update_user(current_user, user_id):
    """Update user profile"""
    try:
        # Ensure user can only update their own profile
        if current_user['id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        user = user_service.update_user(user_id, data)
        return jsonify(user), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to update user'}), 500


@user_bp.route('/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, user_id):
    """Delete user account"""
    try:
        if current_user['id'] != user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        user_service.delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to delete user'}), 500
