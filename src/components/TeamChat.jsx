import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function TeamChat() {
  const { userEmail } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    // Fetch profile & join room
    fetch(`http://localhost:5000/api/auth/profile/${userEmail}`)
      .then(res => res.json())
      .then(async data => {
        if (data.isTeamRegistered) {
          setTeamName(data.teamName);
          socket.emit('join_team', data.teamName);

          const msgRes = await axios.get(`http://localhost:5000/api/messages/${data.teamName}`);
          setMessages(msgRes.data);
        } else {
          alert("You are not registered with a team.");
        }
      });

    socket.on('chat_message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('chat_message');
  }, [userEmail]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && teamName) {
      socket.emit('chat_message', {
        teamName,
        username: userEmail,
        message: input,
      });
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💬 Team Chat: <span style={styles.team}>{teamName}</span></h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.username === userEmail ? styles.myMsg : styles.otherMsg}>
            <strong>{msg.username === userEmail ? "You" : msg.username}</strong>: {msg.message}
            <div style={styles.time}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    fontFamily: "'Segoe UI', sans-serif"
  },
  header: {
    fontSize: '1.5rem',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  team: {
    color: '#10b981',
    fontWeight: '600',
  },
  chatBox: {
    height: '300px',
    overflowY: 'scroll',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  myMsg: {
    textAlign: 'right',
    backgroundColor: '#dcfce7',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    borderRadius: '8px',
    color: '#065f46',
  },
  otherMsg: {
    textAlign: 'left',
    backgroundColor: '#f3f4f6',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    borderRadius: '8px',
    color: '#1f2937',
  },
  time: {
    fontSize: '0.7rem',
    color: '#6b7280',
    marginTop: '0.2rem',
  },
  inputBox: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
