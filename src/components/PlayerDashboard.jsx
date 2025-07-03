import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);


export default function PlayerDashboard() {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [userMsg, setUserMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const responses = {
    "hello": "Hi there! How can I help you with TurFit today?",
    "what are the booking hours": "Turfs are open from 6 AM to 11 PM daily.",
    "which games can i play": "You can play football, cricket, hockey, and badminton.",
    "how to book": "Click on 'View Turfs & Book Slots' to explore available turfs.",
    "register a team": "Go to your Profile and choose 'Register as a Team'.",
    "location of turfs": "We recommend nearby turfs based on your registered location.",
    "bye": "Goodbye! Have a great game!",
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) return;

    const lowerMsg = userMsg.toLowerCase().trim();
    const reply = responses[lowerMsg] || "Sorry, I didn't understand that. Try asking about booking, games, or teams.";

    setChatHistory([...chatHistory, { from: 'user', text: userMsg }, { from: 'bot', text: reply }]);
    setUserMsg('');
  };

  const turfStats = {
  labels: ['Booked', 'Available'],
  datasets: [
    {
      label: 'Turf Slots',
      data: [25, 75],
      backgroundColor: ['#10b981', '#f3f4f6'],
      borderWidth: 1,
    },
  ],
};

const gamePopularity = {
  labels: ['Football', 'Cricket', 'Hockey', 'Badminton'],
  datasets: [
    {
      label: 'Players Joined',
      data: [40, 32, 15, 20],
      backgroundColor: '#10b981',
      borderRadius: 5,
    },
  ],
};

const recommendedTurfs = [
  { name: "Arena Sports - Andheri", distance: "1.2 km", game: "Football" },
  { name: "TurfZone - Malad", distance: "2.5 km", game: "Cricket" },
  { name: "PlayAll - Ghatkopar", distance: "3.1 km", game: "Badminton" },
];


  return (
    <div>
      {/* 🔹 NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>TurFit</div>
        <div>
          <button style={styles.navButton} onClick={() => navigate('/turf-portal')}>Turfs</button>
          <button style={styles.navButton} onClick={() => navigate('/player/profile')}>Profile</button>
          <button style={styles.navButton} onClick={() => navigate('/team-chat')}>Team Chat</button>
          <button
            style={{ ...styles.navButton, backgroundColor: '#ef4444' }}
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}>
            Logout
          </button>
        </div>
      </nav>

      {/* 🔹 MAIN DASHBOARD */}
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome, {userEmail} 👋</h1>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2>⚽ Book a Turf</h2>
            <p>Browse nearby turfs and book your favorite time slot.</p>
            <button style={styles.primaryButton} onClick={() => navigate('/turf-portal')}>Book Turf</button>
          </div>

          <div style={styles.card}>
            <h2>👥 Team Chat</h2>
            <p>Connect with your team using our real-time chat feature.</p>
            <button style={styles.secondaryButton} onClick={() => navigate('/team-chat')}>Join Chat</button>
          </div>

          <div style={styles.card}>
            <h2>👤 Your Profile</h2>
            <p>Update your personal info or register your team.</p>
            <button style={styles.secondaryButton} onClick={() => navigate('/player/profile')}>Edit Profile</button>
          </div>
        </div>

        {/* 🔹 Stats & Charts Section */}
<div style={styles.section}>
  <h2 style={styles.sectionTitle}>📊 Your Sports Stats</h2>
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
    <div style={{ width: '300px' }}>
      <h4 style={{ marginBottom: '0.5rem' }}>Turf Slot Booking Ratio</h4>
      <Pie data={turfStats} />
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ marginBottom: '0.5rem' }}>Game Popularity</h4>
      <Bar data={gamePopularity} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  </div>
</div>

{/* 🔹 Recommendations */}
<div style={styles.section}>
  <h2 style={styles.sectionTitle}>🌟 Recommended Turfs Near You</h2>
  <ul style={{ paddingLeft: 20 }}>
    {recommendedTurfs.map((turf, i) => (
      <li key={i} style={{ marginBottom: '0.7rem' }}>
        <strong>{turf.name}</strong> – {turf.game} • <em>{turf.distance}</em>
      </li>
    ))}
  </ul>
</div>



        {/* 🔹 STATIC CHATBOT */}
        <div style={styles.section}>
          <h2>🤖 Assistant ChatBot</h2>
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
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Ask something like 'How to book?'"
                style={styles.chatInput}
              />
              <button type="submit" style={styles.sendButton}>Send</button>
            </form>
          </div>
        </div>
      </div>

      {/* 🔹 FOOTER */}
      <footer style={styles.footer}>
        <p>© 2025 TurFit. All rights reserved.</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          Made with 💚 for sports lovers.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#10b981',
    padding: '1rem 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navBrand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navButton: {
    marginLeft: '1rem',
    backgroundColor: '#047857',
    border: 'none',
    padding: '0.6rem 1rem',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  container: {
    padding: '2rem 5%',
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    marginBottom: '3rem',
  },
  card: {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
  },
  section: {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    marginBottom: '3rem',
  },
  primaryButton: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.7rem 1.3rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
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
    backgroundColor: '#f1f5f9',
    padding: '1rem',
    textAlign: 'center',
    color: '#4b5563',
    marginTop: '3rem',
  },
};
