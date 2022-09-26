import logo from './logo.svg';
import styles from './App.module.css'
import Header from './Layouts/Header/Header.js'
import MainPage from './Pages/MainPage.js'
import Footer from './Layouts/Footer/Footer.js'
import { useState } from 'react';

function App() {
  const [scrollDestination, setScrollDestionation] = useState("null");
  const [scroll, setScroll] = useState(true);
  function scrollTo(name){
    setScrollDestionation(name);
    setScroll(!scroll);
  }
  return (
    <div>
      <div>
        <Header scrollTo={scrollTo}/>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"80%", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
        <MainPage scrollDestination={scrollDestination} scroll={scroll}/>
      </div>
      <div style={{display:"flex", flexDirection:"column", margin:"auto", paddingTop:"50px", zIndex:"-20"}}>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
