from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()

def create_app():
    """
    Application factory pattern
    Creates and configures the Flask application
    """
    app = Flask(__name__)
    
    # ========================================
    # CONFIGURATION
    # ========================================
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        if db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql://', 1)
        if db_url.startswith('postgresql://') and '+psycopg' not in db_url:
            db_url = db_url.replace('postgresql://', 'postgresql+psycopg://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JSON_SORT_KEYS'] = False
    
    # ========================================
    # INITIALIZE EXTENSIONS
    # ========================================
    db.init_app(app)
    front_url = os.getenv('FRONTEND_URL')
    allowed_origins = [front_url] if front_url else ["*"]
    CORS(app, origins=allowed_origins, supports_credentials=True)
    
    # ========================================
    # REGISTER BLUEPRINTS (Controllers)
    # ========================================
    from app.controllers.user_controller import user_bp
    from app.controllers.restaurant_controller import restaurant_bp
    from app.controllers.menu_controller import menu_bp
    from app.controllers.order_controller import order_bp
    from app.controllers.payment_controller import payment_bp
    from app.controllers.auth_controller import auth_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(restaurant_bp, url_prefix='/api/restaurants')
    app.register_blueprint(menu_bp, url_prefix='/api/menu')
    app.register_blueprint(order_bp, url_prefix='/api/orders')
    app.register_blueprint(payment_bp, url_prefix='/api/payments')
    
    # ========================================
    # ERROR HANDLERS
    # ========================================
    from app.utils.error_handler import register_error_handlers
    register_error_handlers(app)
    
    # ========================================
    # HEALTH CHECK
    # ========================================
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'service': 'python-backend'}, 200
    
    return app
