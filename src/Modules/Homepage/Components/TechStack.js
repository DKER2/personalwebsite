import React from 'react';

function TechStack() {
  const techs = ['Python', 'FastAPI', 'PyTorch', 'React', 'AWS', 'Docker'];

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1a1a2e' }}>
          Tech Stack
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {techs.map((tech, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                border: '1px solid #e0e0e0',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
