import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { restaurantAPI } from '../services/api';
import { indianRestaurants } from '../data/indianData';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [restaurants, searchQuery, cuisineFilter]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantAPI.getAll();
      
      const mergedRestaurants = response.map ? response.map(apiRest => {
        const enhancedData = indianRestaurants.find(r => r.id === apiRest.id);
        return enhancedData ? { ...apiRest, ...enhancedData } : apiRest;
      }) : [];

      if (mergedRestaurants.length === 0) {
        setRestaurants(indianRestaurants);
      } else {
        setRestaurants(mergedRestaurants);
      }
    } catch (error) {
      console.error('Error:', error);
      setRestaurants(indianRestaurants);
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.cuisine && r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    if (cuisineFilter !== 'All') {
      filtered = filtered.filter(r => r.cuisine && r.cuisine.includes(cuisineFilter));
    }

    setFilteredRestaurants(filtered);
  };

  const featuredRestaurants = restaurants.slice(0, 5).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const cuisinesList = [...new Set(restaurants.flatMap(r => r.cuisine || []))];

  if (loading) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="restaurant-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-loader" style={{ height: '300px' }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1>🍔 Midnight cravings, delivered fresh.</h1>
          <p>Premium dark mode for foodies. Discover top picks, curated offers, and lightning-fast delivery.</p>
          {!isAuthenticated && (
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => navigate('/register')}>
                Get Started
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="container">
        {/* Search & Filters */}
        <div className="filter-card mt-3">
          <div className="filter-row">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-chips mt-3">
            <span className="filter-label">Cuisine:</span>
            <button
              className={`pill ${cuisineFilter === 'All' ? 'active' : ''}`}
              onClick={() => setCuisineFilter('All')}
            >
              All
            </button>
            {cuisinesList.map(cuisine => (
              <button
                key={cuisine}
                className={`pill ${cuisineFilter === cuisine ? 'active' : ''}`}
                onClick={() => setCuisineFilter(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {featuredRestaurants.length > 0 && (
          <div className="featured-section">
            <h2 className="section-title">⭐ Top Rated Near You</h2>
            <div className="restaurant-grid">
              {featuredRestaurants.map(restaurant => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="restaurant-card">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="restaurant-image"
                        loading="lazy"
                      />
                      {restaurant.offers && restaurant.offers[0] && (
                        <div className="offer-badge">
                          {restaurant.offers[0].split(' on')[0]}
                        </div>
                      )}
                    </div>

                    <div className="restaurant-info">
                      <div className="restaurant-header">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <div className="restaurant-rating">
                          ★ {restaurant.rating || 4.5}
                        </div>
                      </div>

                      <p className="restaurant-cuisines">
                        {(restaurant.cuisine || []).join(' • ')}
                      </p>

                      <div className="restaurant-meta">
                        <span className="meta-item">🚗 {restaurant.deliveryTime || '30-40 mins'}</span>
                        <span className="meta-item">📍 {restaurant.area || 'Various'}</span>
                      </div>

                      {restaurant.isVeg && (
                        <span className="chip veg" style={{ marginTop: '6px', display: 'inline-flex' }}>
                          🌱 100% Vegetarian
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Restaurants Section */}
        <div className="featured-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              🍽️ All Restaurants
            </h2>
            {filteredRestaurants.length < restaurants.length && (
              <span className="chip-muted">{filteredRestaurants.length} results</span>
            )}
          </div>

          {filteredRestaurants.length > 0 ? (
            <div className="restaurant-grid">
              {filteredRestaurants.map(restaurant => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="restaurant-card">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="restaurant-image"
                        loading="lazy"
                      />
                      {restaurant.offers && restaurant.offers[0] && (
                        <div className="offer-badge">
                          {restaurant.offers[0].split(' on')[0]}
                        </div>
                      )}
                    </div>

                    <div className="restaurant-info">
                      <div className="restaurant-header">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <div className="restaurant-rating">
                          ★ {restaurant.rating || 4.5}
                        </div>
                      </div>

                      <p className="restaurant-cuisines">
                        {(restaurant.cuisine || []).join(' • ')}
                      </p>

                      <div className="restaurant-meta">
                        <span className="meta-item">🚗 {restaurant.deliveryTime || '30-40 mins'}</span>
                        <span className="meta-item">📍 {restaurant.area || 'Various'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state mt-4">
              <div className="empty-emoji">🔍</div>
              <h3 style={{ marginBottom: '6px' }}>No restaurants found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  setSearchQuery('');
                  setCuisineFilter('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
