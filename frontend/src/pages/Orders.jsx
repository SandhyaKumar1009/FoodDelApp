import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getByUser(user.id);
      const apiOrders = response.data || [];

      // Merge offline mock orders stored locally (created when backend data missing)
      const offline = JSON.parse(localStorage.getItem('offlineOrders') || '[]');
      const merged = [...offline, ...apiOrders];
      setOrders(merged);
    } catch (err) {
      const offline = JSON.parse(localStorage.getItem('offlineOrders') || '[]');
      if (offline.length) {
        setOrders(offline);
        setError('Showing offline orders (live fetch failed)');
      } else {
        setError('Failed to load orders');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      confirmed: '#3498db',
      preparing: '#9b59b6',
      ready: '#2ecc71',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#666';
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="container"><div className="error">{error}</div></div>;

  return (
    <div className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Your Orders</h1>

        {orders.length === 0 ? (
          <div className="card">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => {
            const stepIndex = statusSteps.indexOf(order.status);
            const progress = stepIndex >= 0 ? (stepIndex / (statusSteps.length - 1)) * 100 : 0;
            const activeIndex = stepIndex >= 0 ? stepIndex : 0;

            return (
              <div key={order.id} className="card order-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="chip" style={{ textTransform: 'capitalize', color: '#fff', background: getStatusColor(order.status) }}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="progress-track" style={{ marginBottom: '14px' }}>
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  <div className="progress-dots">
                    {statusSteps.map((step, index) => (
                      <span
                        key={step}
                        className={`progress-dot ${index <= activeIndex ? 'active' : ''} ${index === activeIndex ? 'pulse' : ''}`}
                        title={step}
                      ></span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '0.5rem 0'
                    }}>
                      <span>{item.menu_item_name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  borderTop: '1px solid var(--border)',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Delivery Address:</p>
                    <p>{order.delivery_address}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Amount:</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
                      ₹{order.total_amount}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
