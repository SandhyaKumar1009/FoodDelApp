# Payment Service Layer - Business Logic
from app.models import Payment, Order
from app import db
import uuid


class PaymentService:
    """Service layer for payment operations"""
    
    def create_payment(self, data):
        """Create payment for order"""
        # Validate required fields
        required_fields = ['order_id', 'payment_method']
        for field in required_fields:
            if not data.get(field):
                raise ValueError(f'{field} is required')
        
        # Validate payment method
        valid_methods = ['card', 'cash', 'upi']
        if data['payment_method'] not in valid_methods:
            raise ValueError(f'Invalid payment method. Must be one of: {", ".join(valid_methods)}')
        
        # Check if order exists
        order = Order.query.get(data['order_id'])
        if not order:
            raise ValueError('Order not found')
        
        # Check if payment already exists for this order
        existing_payment = Payment.query.filter_by(order_id=data['order_id']).first()
        if existing_payment:
            raise ValueError('Payment already exists for this order')
        
        # Create payment
        payment = Payment(
            order_id=data['order_id'],
            amount=order.total_amount,
            payment_method=data['payment_method'],
            status='completed',  # Simplified: assume payment succeeds
            transaction_id=str(uuid.uuid4())
        )
        
        db.session.add(payment)
        
        # Update order status
        order.status = 'confirmed'
        
        db.session.commit()
        
        return payment.to_dict()
    
    def get_payment_by_id(self, payment_id):
        """Get payment by ID"""
        payment = Payment.query.get(payment_id)
        if not payment:
            raise ValueError('Payment not found')
        return payment.to_dict()
    
    def get_payment_by_order(self, order_id):
        """Get payment for an order"""
        payment = Payment.query.filter_by(order_id=order_id).first()
        if not payment:
            raise ValueError('Payment not found for this order')
        return payment.to_dict()
