import React from 'react';
import Header from '../../../Layouts/Components/Header/Header.js'
import Footer from '../../../Layouts/Components/Footer/Footer.js'
import { useState } from 'react';
import Profile from '../Components/Profile.js';
function HomePage(children) {
    const [scrollDestination, setScrollDestionation] = useState("null");
    const [scroll, setScroll] = useState(true);
    function scrollTo(name){
        setScrollDestionation(name);
        setScroll(!scroll);
    }
    return(
        <div>
            <div>
                <Header scrollTo={scrollTo}/>
            </div>
            <div style={{display:"flex", flexDirection:"column", width:"80%", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <Profile scrollDestination={scrollDestination} scroll={scroll}/>
            </div>
            <div style={{display:"flex", flexDirection:"column", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
                <Footer/>   
            </div>
        </div>
    )
}

export default HomePage;
