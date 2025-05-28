import React from 'react';
import Header from '../../../Layouts/Components/Header/Header.jsx'
import Footer from '../../../Layouts/Components/Footer/Footer.jsx'
import { useState } from 'react';
import Profile from '../Components/Profile.jsx';
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
            <div className="flex flex-col w-4/5 mx-auto pt-[50px] -z-20">
                <Profile scrollDestination={scrollDestination} scroll={scroll}/>
            </div>
            <div className="flex flex-col mx-auto pt-[50px] -z-20">
                <Footer/>   
            </div>
        </div>
    )
}

export default HomePage;
