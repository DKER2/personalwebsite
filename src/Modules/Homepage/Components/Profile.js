import React, { useRef, useEffect } from "react";
import Animation from "./Animation";
import ProfilePicture from './ProfilePicture';
import TimeLine from './TimeLine';
import './Profile.css'

function Profile(props){
    const refExperience = useRef(null);
    const refProject = useRef(null);
    const refEducation = useRef(null);
    const refContact = useRef(null);
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
        "Present",
        "Nanolumi",
        [
          "Drove 90% bug reduction and enhanced security by implementing comprehensive testing, while refactoring an Django outsourced codebase to improve maintainability, scalability, and performance.",
          "Led full-stack development of a job management system (Django/React), delivering transparent activity tracking for clients while enabling internal teams to optimize costs and boost operational efficiency.",
          "Reduced 30% in cloud costs by proposing and implementing a new data analytics architecture and eliminating redundant resources.",
        ],
        "",
      ],
    ].reverse();
    var project=[["Jun 2021","May 2021", "Electrical Field", ["Used  SDL2 to stimulate the Electrical Field to use in teaching Physics"]],
    ["Oct 2021", "March 2022", "Trading Bot",["Work with Binance API to request candlestick data of cryptocurrencies for Machine Learning", "Build up JSON file to store data", "Build database for researching"]],
    ["May 2022","Jul 2022","Stock Chart Website",["Use ReactJS and Nodejs to build the frontend and backend of the website","Use MongoDB to store the data for website"]],
    ["May 2024","Present","Apache Beam",["Open-source contributor"]]].reverse()
    var education=[["Aug 2018","May 2021","High School for Gifted Student",["Specialize in Physics", "Overall Score: 9.5/10"]],
    ["Aug 2021","May 2025","Nanyang Technological University",["Cumulative GPA: 4.62/5.0","Bachelor of Computer Engineering"]]].reverse()

    const scrollTo = (scrollDestination) => {
        switch(scrollDestination){
            case "Experience":
                refExperience.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "Project":
                refProject.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "Academic Learning":
                refEducation.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "Contact":
                refContact.current?.scrollIntoView({ behavior: "smooth" })
                break
            default:
                break
        }
    }

    useEffect(() => {scrollTo(props.scrollDestination)}, 
    [props.scroll, props.scrollDestination])

    const handleScroll = () => {
        const position = window.pageYOffset;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        console.log(position/height);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
      <div>
        <Animation/>
        <ProfilePicture />
        <div ref={refExperience}></div>
        <div style={{ height: "cover" }}>
          <div
            style={{
              fontSize: "50px",
              fontWeight: "700",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            Experience
          </div>
          <TimeLine timeLine={experience} isDisplayLogo={true} />
        </div>
        <div ref={refProject}></div>
        <div style={{ height: "cover" }}>
          <div
            style={{
              fontSize: "50px",
              fontWeight: "700",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            Project
          </div>
          <TimeLine timeLine={project} />
        </div>
        <div ref={refEducation}></div>
        <div style={{ height: "cover" }}>
          <div
            style={{
              fontSize: "50px",
              fontWeight: "700",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            Education
          </div>
          <TimeLine timeLine={education} />
        </div>
        <div ref={refContact}></div>
      </div>
    );
}

export default Profile;
