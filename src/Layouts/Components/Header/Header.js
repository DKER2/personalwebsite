import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { Icon123 } from "react-bootstrap-icons";

function Header(props) {
  const [proportion, setProportion] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  function NavigateItem(props) {
    return (
      <button
        className={styles.button}
        onClick={() => {
          navigateToHomePage();
          props.scrollTo(props.name);
        }}
      >
        <div>{props.name}</div>
      </button>
    );
  }

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
    <div style={{ position: "fixed", zIndex: "99", width: "100%" }}>
      <div
        style={{
          backgroundColor: "white",
          margin: "auto",
          width: "100%",
          height: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{ flex: proportion, background: "black", width: "100%" }}
        ></div>
        <div
          style={{ flex: 1 - proportion, background: "white", width: "100%" }}
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
          className="flex flex-col lg:flex-row"
          style={{
            backgroundColor: "white",
            margin: "auto",
            width: "100%",
            justifyContent: "space-around",
            borderBottom: "solid 3px #555",
          }}
        >
          <NavigateItem name="Experience" scrollTo={props.scrollTo} />
          <div className={styles.seperateLine}></div>
          <NavigateItem name="Project" scrollTo={props.scrollTo} />
          <div className={styles.seperateLine}></div>
          <NavigateItem name="Academic Learning" scrollTo={props.scrollTo} />
          <div className={styles.seperateLine}></div>
          <NavigateItem name="Contact" scrollTo={props.scrollTo} />
          <div className={styles.seperateLine}></div>
          <button onClick={downloadResume} className={styles.button}>
            Download Resume
          </button>
          <div className={styles.seperateLine}></div>
          <button onClick={navigateToPoster} className={styles.button}>
            Posts
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Header;
