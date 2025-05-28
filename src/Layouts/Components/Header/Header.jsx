import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import NavigateItem from "./NavigateItem.jsx"; // Import the new component

function Header(props) {
  const [proportion, setProportion] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  // NavigateItem function is now removed from here

  const handleScroll = () => {
    const position = window.pageYOffset;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setProportion(position / height);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const downloadResume = () => {
    saveAs(
      process.env.PUBLIC_URL + "/resume.pdf", // Path to your PDF file in the public folder
      "Dang_Huy_Phuong_Resume.pdf" // Name of the file when downloaded
    );
  };

  const navigateToPoster = () => {
    navigate(`/posts`); // Navigates to the dynamic route `/:id`
  };

  const navigateToHomePage = () => {
    navigate(`/`); // Navigates to the dynamic route `/:id`
  };

  return (
    <div className="fixed z-[99] w-full">
      <div
        className="bg-white mx-auto w-full h-[5px] flex flex-row justify-around"
      >
        <div
          className="bg-black w-full"
          style={{ flex: proportion }}
        ></div>
        <div
          className="bg-white w-full"
          style={{ flex: 1 - proportion }}
        ></div>
      </div>
      <button
        onClick={toggleNavbar}
        type="button"
        className="inline-flex w-full p-3 lg:hidden bg-white"
        aria-controls="navbar-default"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
      </button>

      <div
        id="navbar-default"
        className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
      >
        <ul
          className="flex flex-col lg:flex-row bg-white mx-auto w-full justify-around border-b-[3px] border-[#555]"
        >
          <NavigateItem name="Experience" scrollTo={props.scrollTo} navigateToHomePage={navigateToHomePage} />
          <div className="border-r-[2px] border-[#555]"></div>
          <NavigateItem name="Project" scrollTo={props.scrollTo} navigateToHomePage={navigateToHomePage} />
          <div className="border-r-[2px] border-[#555]"></div>
          <NavigateItem name="Academic Learning" scrollTo={props.scrollTo} navigateToHomePage={navigateToHomePage} />
          <div className="border-r-[2px] border-[#555]"></div>
          <NavigateItem name="Contact" scrollTo={props.scrollTo} navigateToHomePage={navigateToHomePage} />
          <div className="border-r-[2px] border-[#555]"></div>
          <button onClick={downloadResume} className={styles.button}>
            Download Resume
          </button>
          <div className="border-r-[2px] border-[#555]"></div>
          <button onClick={navigateToPoster} className={styles.button}>
            Posts
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Header;
