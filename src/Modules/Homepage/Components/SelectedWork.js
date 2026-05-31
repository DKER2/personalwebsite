import React from 'react';

function SelectedWork() {
  const workItems = [
    {
      type: 'work',
      company: 'Hypotenuse',
      logo: 'hypotenuse.svg',
      period: 'March 2025 – Present',
      title: 'Software Engineer',
      highlights: [
        'Enhanced system reliability from 89% to 99.99% SLA',
        'Architected AI feedback loops for proactive learning',
        'Streamlined end-to-end user journeys',
      ],
      tags: ['FastAPI', 'React', 'TypeScript', 'AWS'],
    },
    {
      type: 'work',
      company: 'Nanolumi',
      logo: 'nanolumi.png',
      period: 'May 2025 – April 2026',
      title: 'Lead Software Engineer',
      highlights: [
        'Drove 90% bug reduction through comprehensive testing',
        'Led full-stack development of job management system (Django/React)',
        'Reduced 30% cloud costs via new data analytics architecture',
      ],
      tags: ['Django', 'React', 'AWS'],
    },
    {
      type: 'work',
      company: 'Traveloka',
      logo: 'traveloka.png',
      period: 'Jan 2024 – May 2024',
      title: 'Backend Developer',
      highlights: [
        'Engineered a Spring Boot-based internal tool for 200+ users across 20 teams',
        'Reduced 95% processing time and 90% cost via new system architecture',
        'Architected AWS monitoring system for 40 backend teams eliminating throttling',
      ],
      tags: ['Spring Boot', 'AWS', 'System Design'],
    },
    {
      type: 'work',
      company: 'Continental',
      logo: 'continental.jpeg',
      period: 'May 2023 – August 2023',
      title: 'AI Research Intern',
      highlights: [
        'Deeplearning Research Internship in Computer Vision',
        'Literature review on multi-task learning approaches',
        'Developed and experimented with different models on CV tasks',
      ],
      tags: ['Deep Learning', 'Computer Vision', 'Research'],
    },
    {
      type: 'project',
      company: 'Stock Analyse Monorepo',
      logo: null,
      period: 'Jan 2024 – Present',
      title: 'Personal Project',
      highlights: [
        'Full-stack stock analysis platform with real-time data processing',
        'Built with React/NodeJS, MongoDB for data storage',
        'Machine learning models for price prediction and trend analysis',
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'ML'],
      link: 'https://stock-analyse-platform-fe.vercel.app/',
    },
    {
      type: 'project',
      company: 'Apache Beam',
      logo: null,
      period: 'May 2024 – Present',
      title: 'Open Source Contributor',
      highlights: [
        'Contributed to unified programming model for batch and streaming data processing',
      ],
      tags: ['Java', 'Python', 'Open Source'],
      link: 'https://github.com/DKER2/beam',
    },
  ];

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e5e5' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px', textAlign: 'center', color: '#1a1a2e' }}>
          Selected Work
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {workItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                marginBottom: '16px',
                overflow: 'hidden',
              }}
            >
              {/* Left: Logo/Icon section */}
              <div style={{
                width: '80px',
                minHeight: '140px',
                backgroundColor: '#fafafa',
                borderRight: '1px solid #e5e5e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                padding: '16px',
              }}>
                {item.logo ? (
                  <img
                    src={process.env.PUBLIC_URL + '/' + item.logo}
                    alt={item.company}
                    style={{ maxWidth: '60px', maxHeight: '50px', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '28px' }}>🚀</span>
                )}
              </div>

              {/* Right: Content section */}
              <div style={{ flex: 1, padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e' }}>{item.company}</span>
                    <span style={{ fontSize: '13px', color: '#00b894', fontWeight: '600' }}>{item.title}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>{item.period}</span>
                </div>
                <ul style={{ paddingLeft: '18px', margin: '0 0 14px 0', color: '#444', fontSize: '14px', lineHeight: '1.6' }}>
                  {item.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: '#f0f0f0',
                        padding: '4px 10px',
                        borderRadius: '14px',
                        fontSize: '12px',
                        color: '#555',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#00b894',
                        textDecoration: 'none',
                        fontWeight: '600',
                        marginLeft: 'auto',
                      }}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedWork;
