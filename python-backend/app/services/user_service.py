# User Service Layer - Business Logic
from app.models import User
from app import db


class UserService:
    """Service layer for user operations"""
    
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        return user.to_dict()
    
    def update_user(self, user_id, data):
        """Update user profile"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        
        # Update allowed fields
        if 'name' in data:
            user.name = data['name']
        if 'phone' in data:
            user.phone = data['phone']
        if 'address' in data:
            user.address = data['address']
        
        db.session.commit()
        return user.to_dict()
    
    def delete_user(self, user_id):
        """Delete user account"""
        user = User.query.get(user_id)
        if not user:
            raise ValueError('User not found')
        
        db.session.delete(user)
        db.session.commit()
        return True
