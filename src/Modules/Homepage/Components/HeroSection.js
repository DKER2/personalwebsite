import React from 'react';
import ProfilePicture from './ProfilePicture';

function HeroSection() {
  const scrollToWork = () => {
    const el = document.getElementById('selected-work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('cta-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '80px 20px 60px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e5e5', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ProfilePicture />
        <div style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px', color: '#1a1a2e', marginTop: '30px' }}>
          AI Developer for Hire
        </div>
        <div style={{ fontSize: '18px', color: '#555', marginBottom: '36px' }}>
          Custom Models · AI Integration · Intelligent Automation
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToContact}
            style={{
              backgroundColor: '#00b894',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Book a Free Consultation
          </button>
          <button
            onClick={scrollToWork}
            style={{
              backgroundColor: 'transparent',
              color: '#00b894',
              padding: '14px 32px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '15px',
              border: '2px solid #00b894',
              cursor: 'pointer',
            }}
          >
            View My Work
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
