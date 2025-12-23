import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { restaurantAPI, menuAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { getFoodImage } from '../utils/foodImages';
import { indianRestaurants, restaurantMenus } from '../data/indianData';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isMock, setIsMock] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Try API first, fallback to mock data
      try {
        const [restaurantRes, menuRes] = await Promise.all([
          restaurantAPI.getById(id),
          menuAPI.getByRestaurant(id)
        ]);
        
        setRestaurant(restaurantRes.data);
        setMenuItems(menuRes.data);
        setIsMock(false);
      } catch (apiErr) {
        // Fallback to mock data
        const mockRest = indianRestaurants.find(r => r.id === parseInt(id));
        const mockMenu = (restaurantMenus[id] || []).map(item => ({ ...item, mock: true }));
        
        if (mockRest) {
          setRestaurant({ ...mockRest, mock: true });
          setMenuItems(mockMenu);
          setIsMock(true);
        } else {
          setError('Restaurant not found');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    addToCart(
      { ...item, image: getFoodImage(item.name), mock: isMock },
      restaurant ? { ...restaurant, mock: isMock } : restaurant
    );
    
    setNotificationMessage(`✓ ${item.name} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category || 'Other'))];
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="container mt-3">
        <div style={{ height: '300px' }} className="skeleton-loader"></div>
        <div className="menu-grid mt-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ height: '280px' }} className="skeleton-loader"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2>{error}</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );

  if (!restaurant) return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2>Restaurant not found</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="page-shell" style={{ paddingTop: '12px' }}>
      <div className="restaurant-hero">
        <div className="container" style={{ padding: '24px 20px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost"
            style={{ marginBottom: '12px' }}
          >
            ← Back
          </button>

          <div className="restaurant-hero__grid">
            <div>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-hero__image"
              />
            </div>

            <div>
              <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>
                {restaurant.name}
              </h1>

              <div className="chip-row">
                <div className="chip success">⭐ {restaurant.rating || 4.5}/5</div>
                <div className="chip info">🚗 {restaurant.deliveryTime || '30-40 mins'}</div>
                {restaurant.isVeg && (
                  <div className="chip veg">🌱 100% Vegetarian</div>
                )}
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {restaurant.description}
              </p>

              <div className="chip-row">
                <span className="chip">Cuisines: {(restaurant.cuisine || []).join(', ')}</span>
                <span className="chip">📍 {restaurant.area}, {restaurant.city}</span>
              </div>

              {restaurant.offers && restaurant.offers.length > 0 && (
                <div className="chip" style={{ borderColor: 'rgba(255,122,61,0.5)', background: 'rgba(255,122,61,0.08)' }}>
                  🎉 {restaurant.offers[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="toast">{notificationMessage}</div>
      )}

      <div className="container" style={{ padding: '32px 20px' }}>
        <h2 className="section-title" style={{ marginBottom: '18px' }}>
          🍽️ Menu
        </h2>

        {categories.length > 1 && (
          <div className="filter-card" style={{ marginBottom: '20px' }}>
            <div className="filter-chips">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredItems.length > 0 ? (
          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item">
                <img
                  src={getFoodImage(item.name)}
                  alt={item.name}
                  className="menu-item-image"
                  loading="lazy"
                />

                <div className="menu-item-content">
                  <h3 className="menu-item-name">
                    <span className={`veg-indicator ${item.veg ? '' : 'non-veg'}`}>
                      {item.veg ? '🌱' : '🍖'}
                    </span>
                    {item.name}
                  </h3>

                  <p className="menu-item-description">
                    {item.description}
                  </p>

                  <div className="menu-item-footer">
                    <div className="menu-item-price">
                      ₹{item.price}
                    </div>

                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      {isAuthenticated ? 'Add' : 'Login'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-emoji">🍽️</div>
            <h3>No items in this category</h3>
            <p>Try selecting another category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
