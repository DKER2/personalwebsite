import React, { useRef, useEffect } from "react";
import Animation from "../Components/Animation";
import ProfilePicture from '../Components/ProfilePicture';
import TimeLine from '../Components/TimeLine';

function MainPage(props){
    const refExperience = useRef(null);
    const refProject = useRef(null);
    const refEducation = useRef(null);
    const refContact = useRef(null);
    var experience = [["Aug 2021","Dec 2021","Hexagon",["Teach a group of 15 students to prepare for Cambridge A-level tests","Prepare homework and study material for student throughout the course"]],
    ["May 2022","August 2022","Serversam PTE LTD",["Fullstack Developer Internship","Develop and build website using ASP.NET framework","Collaborate with the client to update the product accordingly"]]]
    var project=[["Jun 2021","May 2021", "Electrical Field", ["Used  SDL2 to stimulate the Electrical Field to use in teaching Physics"]],
    ["Oct 2021", "March 2022", "Trading Bot",["Work with Binance API to request candlestick data of cryptocurrencies for Machine Learning", "Build up JSON file to store data", "Build database for researching"]],
    ["May 2022","Jul 2022","Stock Chart Website",["Use ReactJS and Nodejs to build the frontend and backend of the website","Use MongoDB to store the data for website"]]]
    var education=[["Aug 2018","May 2021","High School for Gifted Student",["Specialize in Physics", "Overall Score: 9.5/10"]],
    ["Aug 2021","May 2025","Nanyang Technological University",["Cumulative GPA: 4.6/5.0","Bachelor of Computer Engineering"]]]

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
        }
    }

    useEffect(() => {scrollTo(props.scrollDestination)}, 
    [props.scroll])

    return(
        <div>
            <Animation/>
            <ProfilePicture/>
            <div ref={refExperience}></div>
            <div>
                <div style={{fontSize:"50px",fontWeight:"700", marginBottom:"50px", marginTop: "50px"}}>Experience</div>
                <TimeLine timeLine={experience}/>
            </div>
            <div ref={refProject}></div>
            <div>
                <div style={{fontSize:"50px",fontWeight:"700", marginBottom:"50px", marginTop: "50px"}}>Project</div>
                <TimeLine timeLine={project}/>
            </div>
            <div ref={refEducation}></div>
            <div>
                <div style={{fontSize:"50px",fontWeight:"700", marginBottom:"50px", marginTop: "50px"}}>Education</div>
                <TimeLine timeLine={education}/>
            </div>
            <div ref={refContact}></div>
        </div>
    )
}

export default MainPage;