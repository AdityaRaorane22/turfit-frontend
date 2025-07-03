import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', role: 'player' });
  const navigate = useNavigate();
  const { setUserEmail, setUserType } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://turfit-backend.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setUserEmail(form.email);
      setUserType(form.role);
      alert('Login successful');
      if (form.role === 'player') navigate('/player/dashboard');
      else navigate('/organizer/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to TurFit</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
            type="email"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="role"
                value="player"
                checked={form.role === 'player'}
                onChange={handleChange}
              /> Player
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="role"
                value="organizer"
                checked={form.role === 'organizer'}
                onChange={handleChange}
              /> Organizer
            </label>
          </div>

          <button type="submit" style={styles.button}>Login</button>

          <p style={styles.footerText}>
            Haven't registered yet?{' '}
            <Link
              to={form.role === 'player' ? '/signup/player' : '/signup/organizer'}
              style={styles.link}
            >
              Signup as {form.role}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '0.9rem 1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    padding: '0 0.5rem',
  },
  radioLabel: {
    fontSize: '1rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  button: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.9rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footerText: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    color: '#6b7280',
  },
  link: {
    color: '#10b981',
    textDecoration: 'none',
    fontWeight: '600',
  },
};
