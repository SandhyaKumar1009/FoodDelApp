import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAPI } from '../services/api';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await userAPI.update(user.id, formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="page-shell">
      <div className="container" style={{ maxWidth: '720px' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>My Profile</h1>

        <div className="profile-grid">
          <div className="card">
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</p>
              <p style={{ fontSize: '1.1rem' }}>{user.email}</p>
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          <div className="card">
            <div className="profile-meta">
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>Member since</p>
                <p style={{ fontWeight: '700' }}>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              <span className="chip">{user.name || 'Foodie'}</span>
            </div>
            <div className="divider"></div>
            <button 
              onClick={logout}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
