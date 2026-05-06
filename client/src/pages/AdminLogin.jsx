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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0a0e17 0%, #0d1f35 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(243, 246, 247, 0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25,
        backgroundImage: 'linear-gradient(rgba(0,173,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,173,238,0.06) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* CARD */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        width: '100%',
        maxWidth: 420,
        padding: '48px 40px',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* LOGO */}
        <div style={{ marginBottom: 36, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg,#00adee,#0078ba)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img 
              src="/logo.png" 
              alt="MakeBuilders" 
              style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
            />
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.08em', color: '#fff' }}>
              Make<span style={{ color: '#00adee' }}>Builders</span>
            </div>
          </div>
          <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg,#00adee,#0090c8)', margin: '0 auto' }} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6, textAlign: 'center', fontFamily: "'Playfair Display', serif" }}>
          Admin Login
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
          Sign in to manage your content
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {['email', 'password'].map((field) => (
            <div key={field}>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', marginBottom: 8,
              }}>
                {field === 'email' ? 'Email Address' : 'Password'}
              </label>
              <input
                type={field}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                required
                placeholder={field === 'email' ? 'admin@makebuilders.in' : '••••••••'}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  fontSize: 14,
                  color: '#fff',
                  outline: 'none',
                  borderRadius: 0,
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#00adee'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          {error && (
            <div style={{
              background: 'rgba(229,62,62,0.1)',
              border: '1px solid rgba(229,62,62,0.3)',
              color: '#fc8181',
              fontSize: 13,
              padding: '10px 14px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg,#00adee,#0090c8)',
              color: '#fff',
              border: 'none',
              padding: '14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s, transform 0.2s',
              marginTop: 8,
              boxShadow: '0 8px 24px rgba(0,173,238,0.3)',
            }}
            onMouseEnter={e => { if (!loading) e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;