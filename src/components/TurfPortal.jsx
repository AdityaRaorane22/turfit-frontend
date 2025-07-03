import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TurfPortal() {
  const [events, setEvents] = useState([]);
  const { userEmail } = useAuth();

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events');
    setEvents(res.data);
  };

  const handleBooking = async (eventId, slotIndex) => {
    const confirm = window.confirm("Are you sure you want to book this slot?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/api/events/book-slot/${eventId}/${slotIndex}`, {
        playerEmail: userEmail
      });
      alert("Slot booked successfully!");
      fetchEvents();
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.error || 'Unknown error'));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>⚽ Explore Turfs & Book Your Slot</h2>
      <div style={styles.grid}>
        {events.map((event, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.turfTitle}>{event.turfName}</h3>
            <p style={styles.desc}>{event.description}</p>
            <p><strong>🎮 Game Types:</strong> {event.gameTypes}</p>
            <p><strong>📍 Location:</strong> {event.address}</p>

            <h4 style={styles.slotHeading}>🗓️ Available Slots:</h4>
            <ul style={styles.slotList}>
              {event.slots.map((slot, index) => (
                <li key={index} style={styles.slotItem}>
                  <span>📅 {slot.date} 🕒 {slot.time}</span>
                  {slot.isBooked ? (
                    <span style={styles.bookedText}>❌ Booked by {slot.bookedBy}</span>
                  ) : (
                    <button 
                      onClick={() => handleBooking(event._id, index)} 
                      style={styles.bookButton}
                    >
                      ✅ Book Slot
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 5%',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1f2937',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
  },
  turfTitle: {
    fontSize: '1.5rem',
    color: '#10b981',
    marginBottom: '0.5rem',
  },
  desc: {
    fontSize: '1rem',
    color: '#4b5563',
    marginBottom: '1rem',
  },
  slotHeading: {
    marginTop: '1.2rem',
    marginBottom: '0.5rem',
    color: '#374151',
  },
  slotList: {
    listStyle: 'none',
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  slotItem: {
    backgroundColor: '#f1f5f9',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.95rem',
  },
  bookedText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  }
};
