// src/components/Ticker.jsx
export default function Ticker() {
  return (
    <div style={{
      background: '#004747',
      color: '#E0F7F7',
      fontWeight: 'bold',
      padding: '0.6rem 0',
      fontSize: '1rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }}>
      <marquee behavior="scroll" direction="left" scrollamount="6">
        ✈ Travel Smart, Stay Secure 🔐 | Protect Your Digital Footprint While Exploring the World 🌍 | CyberTeam Presents: Secure Journeys
      </marquee>
    </div>
  );
}