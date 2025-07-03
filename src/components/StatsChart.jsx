import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatsChart() {
  const bookingsBarData = {
    labels: ['Pune Turf', 'Mumbai Turf', 'Delhi Turf'],
    datasets: [
      {
        label: 'Today\'s Bookings',
        data: [12, 8, 5],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };

  const revenuePieData = {
    labels: ['Turf A', 'Turf B', 'Turf C'],
    datasets: [
      {
        data: [14500, 10000, 9000],
        backgroundColor: ['#10b981', '#34d399', '#6ee7b7'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chartCard}>
        <h3 style={styles.title}>📊 Bookings (Bar Chart)</h3>
        <Bar data={bookingsBarData} />
      </div>
      <div style={styles.chartCard}>
        <h3 style={styles.title}>💰 Revenue (Doughnut)</h3>
        <Doughnut data={revenuePieData} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: '#1f2937',
    fontSize: '1.2rem',
  },
};
