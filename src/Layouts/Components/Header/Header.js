import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props) {
  const [proportion, setProportion] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  function handleNavClick(name, path) {
    if (path) {
      navigate(path);
    } else if (props.scrollTo) {
      props.scrollTo(name);
    } else if (name === "Services" || name === "Work" || name === "Contact") {
      navigate("/");
      setTimeout(() => {
        const ids = {
          "Services": "services-section",
          "Work": "selected-work",
          "Contact": "cta-section",
        };
        const id = ids[name];
        if (id) {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
    setIsOpen(false);
  }

  const handleScroll = () => {
    const position = window.pageYOffset;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
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
      process.env.PUBLIC_URL + "/resume.pdf",
      "Dang_Huy_Phuong_Resume.pdf"
    );
  };

  const navItems = [
    { name: "Services", isScroll: true },
    { name: "Work", isScroll: true },
    { name: "Experience", path: "/experience" },
    { name: "Posts", path: "/posts" },
    { name: "Contact", isScroll: true },
  ];

  const isActive = (item) => {
    if (item.path) return location.pathname === item.path;
    return false;
  };

  return (
    <div style={{ position: "fixed", zIndex: "99", width: "100%", top: 0 }}>
      <div
        style={{
          backgroundColor: "white",
          margin: "auto",
          width: "100%",
          height: "4px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flex: proportion, background: "#00b894", width: "100%" }}></div>
        <div style={{ flex: 1 - proportion, background: "white", width: "100%" }}></div>
      </div>

      <button
        onClick={toggleNavbar}
        type="button"
        className="inline-flex w-full p-3 lg:hidden bg-white"
        style={{
          border: "none",
          borderBottom: "1px solid #e5e5e5",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        aria-controls="navbar-default"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          {isOpen ? (
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          ) : (
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          )}
        </svg>
      </button>

      <div
        id="navbar-default"
        className={`${isOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`}
      >
        <div
          className="flex flex-col lg:flex-row items-stretch lg:items-center"
          style={{
            backgroundColor: "white",
            margin: "auto",
            width: "100%",
            borderBottom: "solid 1px #e5e5e5",
            padding: "0 16px",
          }}
        >
          <div
            onClick={() => { navigate("/"); setIsOpen(false); }}
            style={{
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              color: "#1a1a2e",
              padding: "14px 8px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            Dang Huy Phuong{" "}
            <span style={{ color: "#00b894", marginLeft: "6px" }}>| AI Developer</span>
          </div>

          <div style={{ flex: 1 }}></div>

          <ul
            className="flex flex-col lg:flex-row items-stretch lg:items-center"
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {navItems.map((item) => (
              <li key={item.name} style={{ display: "flex" }}>
                <button
                  onClick={() => handleNavClick(item.name, item.path)}
                  style={{
                    border: "none",
                    color: isActive(item) ? "#00b894" : "#333",
                    background: "transparent",
                    fontSize: "15px",
                    fontWeight: "600",
                    padding: "14px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!isActive(item)) e.target.style.color = "#00b894"; }}
                  onMouseLeave={(e) => { if (!isActive(item)) e.target.style.color = "#333"; else e.target.style.color = "#00b894"; }}
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li style={{ display: "flex" }}>
              <button
                onClick={() => { downloadResume(); setIsOpen(false); }}
                style={{
                  border: "none",
                  color: "#333",
                  background: "transparent",
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "14px 16px",
                  cursor: "pointer",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                Resume
              </button>
            </li>
            <li style={{ display: "flex", alignItems: "center", padding: "8px 8px 8px 8px" }}>
              <button
                onClick={() => handleNavClick("Contact")}
                style={{
                  backgroundColor: "#00b894",
                  color: "#fff",
                  padding: "8px 20px",
                  borderRadius: "4px",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
