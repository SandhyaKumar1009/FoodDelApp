# Order Service Layer - Business Logic
from app.models import Order, OrderItem, MenuItem
from app import db
from decimal import Decimal


class OrderService:
    """Service layer for order operations"""
    
    def create_order(self, data):
        """Create new order with items"""
        # Validate required fields
        required_fields = ['user_id', 'restaurant_id', 'items', 'delivery_address']
        for field in required_fields:
            if not data.get(field):
                raise ValueError(f'{field} is required')
        
        if not data['items'] or len(data['items']) == 0:
            raise ValueError('Order must contain at least one item')
        
        # Calculate total
        total_amount = Decimal('0.00')
        order_items_data = []
        
        for item_data in data['items']:
            menu_item = MenuItem.query.get(item_data['menu_item_id'])
            if not menu_item:
                raise ValueError(f'Menu item {item_data["menu_item_id"]} not found')
            
            if menu_item.restaurant_id != data['restaurant_id']:
                raise ValueError('All items must be from the same restaurant')
            
            if not menu_item.is_available:
                raise ValueError(f'{menu_item.name} is not available')
            
            quantity = item_data['quantity']
            price = menu_item.price
            subtotal = price * quantity
            total_amount += subtotal
            
            order_items_data.append({
                'menu_item_id': menu_item.id,
                'quantity': quantity,
                'price': price
            })
        
        # Create order
        order = Order(
            user_id=data['user_id'],
            restaurant_id=data['restaurant_id'],
            total_amount=total_amount,
            delivery_address=data['delivery_address'],
            status='pending'
        )
        
        db.session.add(order)
        db.session.flush()  # Get order ID
        
        # Create order items
        for item_data in order_items_data:
            order_item = OrderItem(
                order_id=order.id,
                menu_item_id=item_data['menu_item_id'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            db.session.add(order_item)
        
        db.session.commit()
        
        return order.to_dict()
    
    def get_order_by_id(self, order_id):
        """Get order by ID"""
        order = Order.query.get(order_id)
        if not order:
            raise ValueError('Order not found')
        return order.to_dict()
    
    def get_orders_by_user(self, user_id):
        """Get all orders for a user"""
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
        return [order.to_dict() for order in orders]
    
    def update_order_status(self, order_id, status):
        """Update order status"""
        valid_statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']
        if status not in valid_statuses:
            raise ValueError(f'Invalid status. Must be one of: {", ".join(valid_statuses)}')
        
        order = Order.query.get(order_id)
        if not order:
            raise ValueError('Order not found')
        
        order.status = status
        db.session.commit()
        
        return order.to_dict()
