import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function PlayerProfile() {
  const { userEmail } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    gamesLiked: [],
    isTeamRegistered: false,
    teamName: ''
  });

  const [newGame, setNewGame] = useState('');
  const [teamNameInput, setTeamNameInput] = useState('');

  const fetchProfile = async () => {
    const res = await axios.get(`http://localhost:5000/api/auth/profile/${userEmail}`);
    setProfile(res.data);
    setTeamNameInput(res.data.teamName || '');
  };

  const handleGameAdd = () => {
    if (newGame.trim()) {
      setProfile(prev => ({
        ...prev,
        gamesLiked: [...prev.gamesLiked, newGame.trim()]
      }));
      setNewGame('');
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/profile/${userEmail}`, {
        gamesLiked: profile.gamesLiked,
        isTeamRegistered: !!teamNameInput,
        teamName: teamNameInput
      });
      alert("✅ Profile updated successfully");
      fetchProfile();
    } catch {
      alert("❌ Failed to update profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 My Profile</h2>

      <div style={styles.section}>
        <p><strong>Name:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>

      <div style={styles.section}>
        <h4 style={styles.subtitle}>🎯 Games I Like</h4>
        <ul>
          {profile.gamesLiked.map((game, i) => (
            <li key={i} style={styles.listItem}>✅ {game}</li>
          ))}
        </ul>
        <input
          value={newGame}
          onChange={e => setNewGame(e.target.value)}
          placeholder="Add new game"
          style={styles.input}
        />
        <button style={styles.addButton} onClick={handleGameAdd}>+ Add Game</button>
      </div>

      <div style={styles.section}>
        <h4 style={styles.subtitle}>🏆 Register As a Team</h4>
        <input
          value={teamNameInput}
          onChange={e => setTeamNameInput(e.target.value)}
          placeholder="Enter your Team Name"
          style={styles.input}
        />
        {profile.isTeamRegistered && (
          <p style={styles.note}>You’re already registered as: <strong>{profile.teamName}</strong></p>
        )}
      </div>

      <button style={styles.saveButton} onClick={handleSave}>💾 Save Profile</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    fontFamily: "'Segoe UI', sans-serif"
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#10b981',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  section: {
    marginBottom: '2rem',
  },
  listItem: {
    marginBottom: '0.5rem',
    color: '#374151',
  },
  input: {
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    marginRight: '1rem',
    width: '60%',
    fontSize: '1rem',
  },
  addButton: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.7rem 1rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '0.9rem 1.5rem',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  },
  note: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#6b7280',
  },
};
