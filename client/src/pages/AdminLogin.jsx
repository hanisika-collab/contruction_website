import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Server error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>

      {/* CARD */}
      <div style={{ background: '#fff', border: '1px solid #e9ecef', width: '100%', maxWidth: 420, padding: '48px 40px', boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>

        {/* LOGO */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111' }}>
            ACE<span style={{ color: '#00adee' }}>CONSTRUCT</span>
          </div>
          <div style={{ width: 32, height: 2, background: '#00adee', margin: '12px auto 0' }} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 6, textAlign: 'center' }}>
          Admin Login
        </h2>
        <p style={{ color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
          Sign in to manage your content
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              placeholder="admin@aceconstruct.in"
              style={{
                width: '100%', padding: '12px 14px', border: '1.5px solid #e9ecef',
                background: '#fff', fontSize: 14, color: '#111', outline: 'none',
                borderRadius: 0, boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#00adee'}
              onBlur={e => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 14px', border: '1.5px solid #e9ecef',
                background: '#fff', fontSize: 14, color: '#111', outline: 'none',
                borderRadius: 0, boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#00adee'}
              onBlur={e => e.target.style.borderColor = '#e9ecef'}
            />
          </div>

          {error && (
            <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#e53e3e', fontSize: 13, padding: '10px 14px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#00adee', color: '#fff', border: 'none', padding: '14px',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s', marginTop: 8,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;