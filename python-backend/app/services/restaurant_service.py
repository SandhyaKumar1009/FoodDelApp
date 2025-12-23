# Restaurant Service Layer - Business Logic
from app.models import Restaurant
from app import db
from app.utils.cache import cache_get, cache_set


class RestaurantService:
    """Service layer for restaurant operations"""
    
    CACHE_TTL = 300  # 5 minutes
    
    def get_all_restaurants(self):
        """Get all active restaurants with caching"""
        # Try cache first
        cached = cache_get('all_restaurants')
        if cached:
            return cached
        
        # Query database
        restaurants = Restaurant.query.filter_by(is_active=True).all()
        result = [restaurant.to_dict() for restaurant in restaurants]
        
        # Cache result
        cache_set('all_restaurants', result, self.CACHE_TTL)
        
        return result
    
    def get_restaurant_by_id(self, restaurant_id):
        """Get restaurant by ID"""
        # Try cache first
        cache_key = f'restaurant_{restaurant_id}'
        cached = cache_get(cache_key)
        if cached:
            return cached
        
        # Query database
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            raise ValueError('Restaurant not found')
        
        result = restaurant.to_dict()
        
        # Cache result
        cache_set(cache_key, result, self.CACHE_TTL)
        
        return result
    
    def create_restaurant(self, data):
        """Create new restaurant"""
        # Validate required fields
        required_fields = ['name', 'address']
        for field in required_fields:
            if not data.get(field):
                raise ValueError(f'{field} is required')
        
        restaurant = Restaurant(
            name=data['name'],
            description=data.get('description'),
            address=data['address'],
            phone=data.get('phone')
        )
        
        db.session.add(restaurant)
        db.session.commit()
        
        # Invalidate cache
        cache_set('all_restaurants', None, 0)
        
        return restaurant.to_dict()
