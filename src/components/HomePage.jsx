import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>
            <h2 style={styles.logoText}>TurFit</h2>
          </div>
          <div style={styles.navLinks}>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Book Your Perfect Turf
            <span style={styles.heroAccent}> Anytime, Anywhere</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Connect with players, find nearby turfs, and manage your game time with our comprehensive turf management system.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/login" style={styles.primaryButton}>
              Get Started
            </Link>
            <button style={styles.secondaryButton}>
              Learn More
            </button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.heroImagePlaceholder}>
            <div style={styles.footballIcon}>⚽</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Why Choose TurFit?</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏟️</div>
              <h3 style={styles.featureTitle}>Easy Booking</h3>
              <p style={styles.featureDescription}>
                Search and book available turf slots in real-time with our intuitive booking system.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>👥</div>
              <h3 style={styles.featureTitle}>Team Management</h3>
              <p style={styles.featureDescription}>
                Register as a team, chat with teammates, and coordinate your games seamlessly.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🗺️</div>
              <h3 style={styles.featureTitle}>Location Finder</h3>
              <p style={styles.featureDescription}>
                Find nearby turfs with integrated maps and get directions to your chosen venue.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💬</div>
              <h3 style={styles.featureTitle}>Real-time Chat</h3>
              <p style={styles.featureDescription}>
                Connect with other players and organize games using our built-in chat system.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📱</div>
              <h3 style={styles.featureTitle}>Mobile Friendly</h3>
              <p style={styles.featureDescription}>
                Access your bookings and manage your profile from any device, anywhere.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>⚡</div>
              <h3 style={styles.featureTitle}>Instant Updates</h3>
              <p style={styles.featureDescription}>
                Get real-time notifications about booking confirmations and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <div style={styles.stepsGrid}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Sign Up</h3>
              <p style={styles.stepDescription}>Create your account as a player or organizer</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Find Turfs</h3>
              <p style={styles.stepDescription}>Search for available turfs near you</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Book & Play</h3>
              <p style={styles.stepDescription}>Select your slot and enjoy your game</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
          <p style={styles.ctaDescription}>
            Join thousands of players who trust TurfMaster for their game bookings
          </p>
          <Link to="/login" style={styles.ctaButton}>
            Start Playing Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.sectionContainer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>TurfMaster</h3>
              <p style={styles.footerText}>Your ultimate turf booking companion</p>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerSubtitle}>Quick Links</h4>
              <Link to="/login" style={styles.footerLink}>Login</Link>
              <Link to="/register" style={styles.footerLink}>Register</Link>
              <Link to="/about" style={styles.footerLink}>About</Link>
            </div>
            <div style={styles.footerSection}>
              <h4 style={styles.footerSubtitle}>Contact</h4>
              <p style={styles.footerText}>info@turfmaster.com</p>
              <p style={styles.footerText}>+91 12345 67890</p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerText}>© 2025 TurfMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: '1.6',
    margin: 0,
    padding: 0,
    backgroundColor: '#f8fafc',
  },
  
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#10b981',
    margin: 0,
  },
  
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  
  navLink: {
    textDecoration: 'none',
    color: '#374151',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    display: 'inline-block',
  },
  
  hero: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '4rem 5%',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  
  heroContent: {
    flex: 1,
    minWidth: '300px',
  },
  
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
    lineHeight: '1.1',
  },
  
  heroAccent: {
    color: '#10b981',
  },
  
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#6b7280',
    marginBottom: '2.5rem',
    maxWidth: '500px',
  },
  
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  
  primaryButton: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#10b981',
    padding: '1rem 2rem',
    border: '2px solid #10b981',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
  },
  
  heroImagePlaceholder: {
    width: '400px',
    height: '400px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
  },
  
  footballIcon: {
    fontSize: '8rem',
    color: 'white',
  },
  
  features: {
    padding: '5rem 5%',
    backgroundColor: '#ffffff',
  },
  
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  
  featureCard: {
    backgroundColor: '#f8fafc',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  
  featureDescription: {
    color: '#6b7280',
    fontSize: '1rem',
  },
  
  howItWorks: {
    padding: '5rem 5%',
    backgroundColor: '#f8fafc',
  },
  
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  step: {
    textAlign: 'center',
  },
  
  stepNumber: {
    width: '60px',
    height: '60px',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem',
  },
  
  stepTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  
  stepDescription: {
    color: '#6b7280',
    fontSize: '1rem',
  },
  
  cta: {
    padding: '5rem 5%',
    backgroundColor: '#10b981',
    color: 'white',
    textAlign: 'center',
  },
  
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  
  ctaDescription: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  
  ctaButton: {
    backgroundColor: 'white',
    color: '#10b981',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '3rem 5% 1rem',
  },
  
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  
  footerTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '1rem',
  },
  
  footerSubtitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  
  footerLink: {
    color: '#d1d5db',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    display: 'inline-block',
    padding: '0.2rem 0',
    fontSize: '0.9rem',
  },
  
  footerText: {
    color: '#d1d5db',
    fontSize: '0.9rem',
    margin: 0,
  },
  
  footerBottom: {
    borderTop: '1px solid #374151',
    paddingTop: '2rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
};