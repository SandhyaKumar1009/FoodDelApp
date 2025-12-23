# Auth Service Layer - Business Logic
from app.models import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from datetime import datetime, timedelta


class AuthService:
    """Service layer for authentication operations"""
    
    def register_user(self, data):
        """Register a new user"""
        # Validate required fields
        required_fields = ['name', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                raise ValueError(f'{field} is required')
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            raise ValueError('User with this email already exists')
        
        # Create new user
        user = User(
            name=data['name'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            phone=data.get('phone'),
            address=data.get('address')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return {'message': 'User registered successfully', 'user': user.to_dict()}
    
    def login_user(self, data):
        """Login user and return JWT token"""
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise ValueError('Email and password are required')
        
        # Find user
        user = User.query.filter_by(email=email).first()
        if not user:
            raise ValueError('Invalid email or password')
        
        # Check password
        if not check_password_hash(user.password_hash, password):
            raise ValueError('Invalid email or password')
        
        # Generate JWT token
        token = self._generate_token(user)
        
        return {
            'token': token,
            'user': user.to_dict()
        }
    
    def validate_token(self, token):
        """Validate JWT token"""
        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])
            user = User.query.get(payload['user_id'])
            if not user:
                raise ValueError('User not found')
            return {'valid': True, 'user': user.to_dict()}
        except jwt.ExpiredSignatureError:
            raise ValueError('Token has expired')
        except jwt.InvalidTokenError:
            raise ValueError('Invalid token')
    
    def _generate_token(self, user):
        """Generate JWT token"""
        payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(days=7)
        }
        return jwt.encode(payload, os.getenv('JWT_SECRET_KEY'), algorithm='HS256')
