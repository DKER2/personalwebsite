import React from 'react';

function CTASection() {
  const handleContact = () => {
    window.location.href = 'mailto:pdanghuy03@gmail.com?subject=Free%20AI%20Consultation';
  };

  return (
    <div style={{ padding: '70px 20px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', color: '#1a1a2e' }}>
          Ready to Build Something Intelligent?
        </div>
        <div style={{ fontSize: '16px', color: '#555', marginBottom: '28px' }}>
          Book a free 30-minute consultation. No commitment.
        </div>
        <button
          onClick={handleContact}
          style={{
            backgroundColor: '#00b894',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#00a383')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#00b894')}
        >
          Schedule a Call
        </button>
      </div>
    </div>
  );
}

export default CTASection;
