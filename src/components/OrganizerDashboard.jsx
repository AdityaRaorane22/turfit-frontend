import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatsChart from './StatsChart';


export default function OrganizerDashboard() {
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  const sampleTurfs = [
    { id: 1, name: "TurFit Arena - Pune", slots: "6 AM - 10 PM", bookings: 12 },
    { id: 2, name: "GreenGoal Turf - Mumbai", slots: "5 AM - 11 PM", bookings: 8 },
  ];

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const responses = {
    "how to add a turf": "Go to '+ Add New Turf' to register your turf with address and game types.",
    "can i manage slots": "Yes! Click 'Manage Slots' next to your turf to add or edit time slots.",
    "how to view bookings": "Each turf card shows daily bookings. You can also sync with calendar later.",
    "what games can i offer": "Football, Cricket, Hockey, Badminton and more. You can list custom ones too.",
    "hi": "Hello Organizer 👋 How can I assist you today?",
    "bye": "Goodbye! Wishing you a fully booked day 🌟",
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const lowerMsg = chatInput.toLowerCase().trim();
    const reply = responses[lowerMsg] || "Sorry, I didn’t get that. Try asking about adding turf, slots, or bookings.";
    setChatHistory([...chatHistory, { from: 'user', text: chatInput }, { from: 'bot', text: reply }]);
    setChatInput('');
  };

  const stats = [
    { label: "Total Turfs", value: sampleTurfs.length },
    { label: "Today's Bookings", value: sampleTurfs.reduce((acc, t) => acc + t.bookings, 0) },
    { label: "Monthly Revenue", value: "₹34,500" },
    { label: "Active Users", value: 96 },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>🏟️ TurFit Organizer</div>
        <div style={styles.navRight}>
          <span>Welcome, <strong>{userEmail}</strong></span>
          <button style={styles.logoutBtn} onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            Logout
          </button>
        </div>
      </div>

            {/* Events */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚽ Events</h2>
        <button style={styles.secondaryButton} onClick={() => navigate('/sport-event')}>+ Add Sport Event</button>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <h4>{stat.label}</h4>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Turf Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 My Turfs</h2>
        {sampleTurfs.map(turf => (
          <div key={turf.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{turf.name}</h3>
            <p>Slots: {turf.slots}</p>
            <p>Today's Bookings: {turf.bookings}</p>
            <button style={styles.button} onClick={() => navigate(`/manage-turf/${turf.id}`)}>Manage Slots</button>
          </div>
        ))}
        <button style={styles.primaryButton} onClick={() => navigate('/add-turf')}>+ Add New Turf</button>
      </div>

      <StatsChart />




      {/* Chatbot */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🤖 Assistant ChatBot</h2>
        <div style={styles.chatBox}>
          <div style={styles.chatHistory}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={msg.from === 'user' ? styles.userMsg : styles.botMsg}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} style={styles.chatForm}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask something like 'How to add turf?'"
              style={styles.chatInput}
            />
            <button type="submit" style={styles.sendButton}>Send</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 TurFit • Helping Organizers Manage Better</p>
      </footer>
    </div>
  );
}

// Styles
const styles = {
  container: {
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', sans-serif",
    paddingBottom: '4rem',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10b981',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  statsContainer: {
    display: 'flex',
    gap: '1rem',
    padding: '2rem',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: '1 1 200px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  section: {
    margin: '1rem 2rem',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    color: '#10b981',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  primaryButton: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.8rem 1.3rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '1rem',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    border: '2px solid #10b981',
    color: '#10b981',
    padding: '0.7rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  chatBox: {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '1rem',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
  },
  chatHistory: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    maxWidth: '80%',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    color: '#111827',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    maxWidth: '80%',
  },
  chatForm: {
    display: 'flex',
    gap: '0.5rem',
  },
  chatInput: {
    flex: 1,
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  sendButton: {
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f1f5f9',
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.9rem',
  },
};
