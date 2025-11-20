// src/components/CircleLogo.jsx
export default function CircleLogo() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#008B8B',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 1000,
        pointerEvents: 'none', // so it doesn't block clicks underneath
      }}
    >
      Cyber<br />Team
    </div>
  );
}