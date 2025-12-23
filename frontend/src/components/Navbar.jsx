import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { getItemCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">🍴</span>
          <div>
            <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>FoodApp</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Express cravings, dark mode</div>
          </div>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="nav-link nav-chip">
                Cart <span className="badge">{getItemCount()}</span>
              </Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
              <div className="nav-chip" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 6px rgba(255,122,61,0.16)' }}></span>
                <span style={{ fontWeight: 700 }}>{user?.name || 'Guest'}</span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-chip">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
