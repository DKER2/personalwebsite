import React from 'react';
import Header from '../../../Layouts/Components/Header/Header.js';
import Footer from '../../../Layouts/Components/Footer/Footer.js';
import TimeLine from '../../Homepage/Components/TimeLine.js';

function ExperiencePage() {
  var experience = [
    [
      "Aug 2021",
      "Dec 2021",
      "Hexagon",
      [
        "Teach a group of 15 students to prepare for Cambridge A-level tests",
        "Prepare homework and study material for student throughout the course",
      ],
      "hexagon.jpg",
    ],
    [
      "May 2022",
      "August 2022",
      "Serversam PTE LTD",
      [
        "Fullstack Developer Internship",
        "Develop and build website using ASP.NET framework",
        "Collaborate with the client to update the product accordingly",
      ],
      "serversam.jpeg",
    ],
    [
      "Aug 2022",
      "Jun 2023",
      "URECA Research Programme",
      [
        "DNN approaches to speech diarization",
        "Use BiEncoder Model to predict height and age",
      ],
      "ntu.png",
    ],
    [
      "May 2023",
      "August 2023",
      "Continental",
      [
        "Deeplearning Research Internship",
        "Do Literature review about multi-task learning",
        "Develop and experiment with different model on Computer Vision tasks",
      ],
      "continental.jpeg",
    ],
    [
      "Jan 2024",
      "May 2024",
      "Traveloka",
      [
        "Engineered a Spring Boot-based internal tool for over 200 users across 20 teams that automated financial audit workflows, enhancing data processing efficiency.",
        "Reduced 95% in processing and 90% in cost for data conversion process by proposing and developing a newly designed system architecture.",
        "Architected a system for all 40 backend teams at Traveloka to monitor and alert usage threshold across AWS services, eliminating the possibility of throttling accidents and ensuring the smooth operation of applications.",
      ],
      "traveloka.png",
    ],
    [
      "Nov 2024",
      "April 2025",
      "Privyr",
      [
        "Developed a scalable Django backend and dynamic Vue.js frontend webapp for a CRM system serving thousands of organizations, driving a 300% improvement in lead-to-sale conversion rates.",
        "Designed and implemented advanced analytics systems, empowering data-driven insights, enabling seamless team progress tracking, and boosting operational efficiency.",
        "Boosted user accessiblity and CRM usage by 20% through innovative seamless file import/export integrations, streamlining data entry.",
      ],
      "privyr.png",
    ],
    [
      "May 2025",
      "April 2026",
      "Nanolumi",
      [
        "Drove 90% bug reduction and enhanced security by implementing comprehensive testing, while refactoring an Django outsourced codebase to improve maintainability, scalability, and performance.",
        "Led full-stack development of a job management system (Django/React), delivering transparent activity tracking for clients while enabling internal teams to optimize costs and boost operational efficiency.",
        "Reduced 30% in cloud costs by proposing and implementing a new data analytics architecture and eliminating redundant resources.",
      ],
      "nanolumi.png",
    ],
    [
      "March 2025",
      "Present",
      "Hypotenuse",
      [
        "Enhanced system reliability by increasing the integration success rate of heavy-load operations from 89% to a 99.99% SLA.",
        "Architected AI feedback loops by building a system that enables proactive learning to improve generation quality.",
        "Streamlined platform workflows by managing the end-to-end user journey to deliver a smooth and efficient experience.",
      ],
      "hypotenuse.svg",
    ],
  ].reverse();

  return (
    <div>
      <Header />
      <div style={{ paddingTop: '80px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '60px' }}>
        <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '50px', marginTop: '30px', color: '#1a1a2e' }}>
          Work Experience
        </div>
        <TimeLine timeLine={experience} isDisplayLogo={true} />
      </div>
      <Footer />
    </div>
  );
}

export default ExperiencePage;
