import React from 'react';

function Services() {
  const services = [
    {
      emoji: '🧠',
      title: 'Custom AI Models',
      description: 'Train and deploy models tailored to your business needs. From NLP to computer vision.',
    },
    {
      emoji: '🔌',
      title: 'AI Integration',
      description: 'Embed AI into your existing apps, APIs, and workflows. Seamless, scalable, secure.',
    },
    {
      emoji: '🤖',
      title: 'Intelligent Automation',
      description: 'Build self-improving systems that cut costs, save time, and boost efficiency.',
    },
  ];

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center', color: '#1a1a2e' }}>
          Services
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 280px',
                maxWidth: '340px',
                border: '1px solid #e5e5e5',
                padding: '32px 24px',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{service.emoji}</div>
              <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '10px', color: '#1a1a2e' }}>
                {service.title}
              </div>
              <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                {service.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
