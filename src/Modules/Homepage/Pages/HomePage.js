import React from 'react';
import Header from '../../../Layouts/Components/Header/Header.js';
import Footer from '../../../Layouts/Components/Footer/Footer.js';
import HeroSection from '../Components/HeroSection.js';
import Services from '../Components/Services.js';
import SelectedWork from '../Components/SelectedWork.js';
import TechStack from '../Components/TechStack.js';
import CTASection from '../Components/CTASection.js';

function HomePage() {
  function scrollTo(name) {
    const ids = {
      'Services': 'services-section',
      'Work': 'selected-work',
      'Contact': 'cta-section',
    };
    const id = ids[name];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <Header scrollTo={scrollTo} />
      <div style={{ paddingTop: '50px' }}>
        <HeroSection />
        <div id="services-section">
          <Services />
        </div>
        <div id="selected-work">
          <SelectedWork />
        </div>
        <TechStack />
        <div id="cta-section">
          <CTASection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
