// src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CircleLogo from '../components/CircleLogo';

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// ← Paste your config here (from Firebase console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date()
      });
      setStatus('Thank you! Your message was sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Error sending message. Try again.');
    }
  };

  return (
    <>
      <Header />

      {/* 100% YOUR ORIGINAL STYLING — NOT TOUCHED */}
      <section style={{
        padding: '3rem 2rem',
        backgroundImage: `url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>

          {/* Card 1 */}
          <div style={cardStyle}>
            <div style={overlayStyle('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1')} />
            <div style={contentStyle}>
              <h2>Get in Touch</h2>
              <p>Address: Secure Journeys HQ, Cyber City</p>
              <p>Email: hello@securejourneys.com</p>
              <p>Phone: +92 300 1234567</p>
              <p>Secure Chat: Available Soon</p>
            </div>
          </div>

          {/* Card 2 — Form with Firebase */}
          <div style={cardStyle}>
            <div style={overlayStyle('https://images.unsplash.com/photo-1503264116251-35a269479413')} />
            <div style={contentStyle}>
              <h2>Send Us a Message</h2>

              {status && (
                <div style={{
                  background: status.includes('Thank you') ? 'rgba(0,100,100,0.9)' : 'rgba(100,0,0,0.9)',
                  color: '#e0ffff',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="name">Name</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required style={inputStyle} />

                <label htmlFor="email">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required style={inputStyle} />

                <label htmlFor="message">Message</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Write your message here..." required style={{ ...inputStyle, height: 'auto' }} />

                <button type="submit" style={buttonStyle}
                  onMouseOver={e => e.target.style.background = '#006666'}
                  onMouseOut={e => e.target.style.background = '#008080'}>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Card 3 */}
          <div style={cardStyle}>
            <div style={overlayStyle('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')} />
            <div style={contentStyle}>
              <h2>Find Us Here</h2>
              <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="300" style={{ border: 0, borderRadius: '10px' }} allowFullScreen="" loading="lazy" />
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <CircleLogo />
    </>
  );
}

// YOUR ORIGINAL STYLES — NOT TOUCHED AT ALL
const cardStyle = {
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2rem',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  flex: '1 1 320px',
  maxWidth: '600px',
  cursor: 'default',
};

const overlayStyle = (url) => ({
  content: '""',
  position: 'absolute',
  top: 0, left: 0, width: '100%', height: '100%',
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.3,
  zIndex: 0,
  borderRadius: '15px',
});

const contentStyle = {
  position: 'relative',
  zIndex: 1,
};

const inputStyle = {
  padding: '0.8rem',
  border: '1px solid #b2dfdb',
  borderRadius: '8px',
  marginBottom: '1rem',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '0.9rem',
  background: '#008080',
  border: 'none',
  color: 'white',
  fontSize: '1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  alignSelf: 'flex-start',
  transition: 'background 0.3s ease-in-out',
};