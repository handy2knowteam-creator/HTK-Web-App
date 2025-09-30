import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginWorking = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication check
    if (credentials.username === 'admin' && credentials.password === 'HTK2024Admin!') {
      localStorage.setItem('htkAdminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#111',
        padding: '40px',
        borderRadius: '10px',
        border: '2px solid #B9975B',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: '30px'
        }}>
          <img 
            src="/htk-logo-premium.png" 
            alt="HTK Logo" 
            style={{
              width: '80px',
              height: '80px',
              marginBottom: '20px'
            }}
          />
          <h1 style={{
            color: '#B9975B',
            fontSize: '28px',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>HTK Admin</h1>
          <p style={{
            color: '#ccc',
            fontSize: '16px'
          }}>Secure Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#B9975B',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#222',
                border: '1px solid #B9975B',
                borderRadius: '5px',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#B9975B',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#222',
                border: '1px solid #B9975B',
                borderRadius: '5px',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div style={{
              color: '#ff4444',
              backgroundColor: '#330000',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(45deg, #8C6A3C, #B9975B, #8C6A3C)',
              border: 'none',
              borderRadius: '5px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Authenticating...' : 'Login to Admin'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#0a0a0a',
          borderRadius: '5px',
          border: '1px solid #333'
        }}>
          <p style={{
            color: '#888',
            fontSize: '12px',
            margin: 0,
            textAlign: 'center'
          }}>
            🔒 Secure Admin Portal<br/>
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginWorking;
