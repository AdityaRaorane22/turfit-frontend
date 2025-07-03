import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SportEventForm() {
  const { userEmail } = useAuth();
  const [form, setForm] = useState({
    turfName: '',
    description: '',
    gameTypes: '',
    address: '',
    lat: 19.0760,
    lng: 72.8777,
    slots: [],
  });

  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');

  const handleGeoSearch = async () => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: form.address, format: 'json' }
      });
      const loc = res.data[0];
      setForm({ ...form, lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) });
    } catch {
      alert("Location not found");
    }
  };

  const addSlot = () => {
    if (slotDate && slotTime) {
      const slot = {
        date: slotDate,
        time: slotTime,
        isBooked: false,
        bookedBy: null
      };
      setForm({ ...form, slots: [...form.slots, slot] });
      setSlotDate('');
      setSlotTime('');
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/events/create', {
      ...form,
      createdBy: userEmail
    });
    alert("Event created successfully");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏟️ Create Sport Event</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="turfName" placeholder="Turf Name" onChange={handleChange} style={styles.input} />
        <textarea name="description" placeholder="Description" onChange={handleChange} style={styles.textarea} />
        <input name="gameTypes" placeholder="Game Types (comma-separated)" onChange={handleChange} style={styles.input} />
        <div style={styles.addressGroup}>
          <input name="address" placeholder="Turf Address" onChange={handleChange} style={styles.input} />
          <button type="button" onClick={handleGeoSearch} style={styles.buttonSmall}>📍 Locate on Map</button>
        </div>

        <div style={styles.mapContainer}>
          <MapContainer center={[form.lat, form.lng]} zoom={15} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[form.lat, form.lng]} />
          </MapContainer>
        </div>

        <h4 style={styles.subTitle}>🕐 Add Available Slot</h4>
        <div style={styles.slotGroup}>
          <input type="date" value={slotDate} onChange={e => setSlotDate(e.target.value)} style={styles.inputSmall} />
          <input type="time" value={slotTime} onChange={e => setSlotTime(e.target.value)} style={styles.inputSmall} />
          <button type="button" onClick={addSlot} style={styles.buttonSmall}>+ Add Slot</button>
        </div>

        <ul style={styles.slotList}>
          {form.slots.map((slot, idx) => (
            <li key={idx} style={styles.slotItem}>
              {slot.date} at {slot.time} — <strong>{slot.isBooked ? 'Booked' : 'Available'}</strong>
            </li>
          ))}
        </ul>

        <button type="submit" style={styles.submitButton}>✅ Create Event</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 5%',
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: '2rem',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  subTitle: {
    fontSize: '1.2rem',
    margin: '1.5rem 0 1rem',
    color: '#10b981',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    height: '80px',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  addressGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  mapContainer: {
    height: '300px',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  slotGroup: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  inputSmall: {
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  buttonSmall: {
    padding: '0.6rem 1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  slotList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginBottom: '1.5rem',
  },
  slotItem: {
    padding: '0.5rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    marginBottom: '0.5rem',
  },
  submitButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '0.9rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  }
};
