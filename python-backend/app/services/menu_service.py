# Menu Service Layer - Business Logic
from app.models import MenuItem
from app import db
from app.utils.cache import cache_get, cache_set


class MenuService:
    """Service layer for menu operations"""
    
    CACHE_TTL = 300  # 5 minutes
    
    def get_menu_by_restaurant(self, restaurant_id):
        """Get all menu items for a restaurant"""
        # Try cache first
        cache_key = f'menu_restaurant_{restaurant_id}'
        cached = cache_get(cache_key)
        if cached:
            return cached
        
        # Query database
        items = MenuItem.query.filter_by(
            restaurant_id=restaurant_id,
            is_available=True
        ).all()
        
        result = [item.to_dict() for item in items]
        
        # Cache result
        cache_set(cache_key, result, self.CACHE_TTL)
        
        return result
    
    def get_menu_item_by_id(self, item_id):
        """Get menu item by ID"""
        item = MenuItem.query.get(item_id)
        if not item:
            raise ValueError('Menu item not found')
        return item.to_dict()
    
    def create_menu_item(self, data):
        """Create new menu item"""
        # Validate required fields
        required_fields = ['restaurant_id', 'name', 'price']
        for field in required_fields:
            if not data.get(field):
                raise ValueError(f'{field} is required')
        
        item = MenuItem(
            restaurant_id=data['restaurant_id'],
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            category=data.get('category')
        )
        
        db.session.add(item)
        db.session.commit()
        
        # Invalidate cache
        cache_key = f'menu_restaurant_{data["restaurant_id"]}'
        cache_set(cache_key, None, 0)
        
        return item.to_dict()
