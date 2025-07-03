import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPagePlayer() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'organiser' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://turfit-backend.onrender.com/api/auth/signup', form);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account ⚽</h2>
        <p style={styles.subtitle}>Join TurFit as a Organiser</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            style={styles.input}
            required
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            type="email"
            style={styles.input}
            required
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Register</button>

          <p style={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Login</Link>
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
