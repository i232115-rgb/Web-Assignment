// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = {
    textDecoration: 'none',
    color: '#E0F7F7',
    fontWeight: '500',
    transition: 'color 0.3s',
  };

  const activeStyle = {
    ...linkStyle,
    color: '#ffffff',
    borderBottom: '2px solid #ffffff',
    paddingBottom: '2px',
  };

  return (
    <header style={{ background: '#008B8B', padding: '1rem 2rem' }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          color: '#ffffff',
          letterSpacing: '1px',
        }}>
          ✈ Secure Journeys
        </div>

        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: '1.5rem',
          margin: 0,
          padding: 0,
        }}>
          <li><Link to="/" style={isActive('/') ? activeStyle : linkStyle}>Home</Link></li>
          <li><Link to="/gallery" style={isActive('/gallery') ? activeStyle : linkStyle}>Gallery</Link></li>
          <li><Link to="/contact" style={isActive('/contact') ? activeStyle : linkStyle}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}