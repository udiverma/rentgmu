import React from "react";
import "./Home.css";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

// When Logout is clicked
const Logout = (setCurrentPage) => {
  console.log("log");
  window.localStorage.removeItem("isLoggedIn");
  setCurrentPage = "";
  window.location.reload();
};

const Contact = (props) => {
  props.setCurrentPage("/contact");
  document.body.style.background = "#ffec8b";
  document.body.style.minHeight = "0";

  document.body.style.display = "";
  const navigate = useNavigate();

  return (
    <div className="home-app">
      <h1 className="home-title">RENTGMU</h1>
      <div className="topnav">
        <a href="#home" onClick={() => navigate("/home")}>
          Home
        </a>
        <a href="#contact" className="active">
          Contact
        </a>
        <a href="#about" onClick={() => navigate("/about")}>
          About
        </a>
        <a href="#MyProfile" onClick={() => navigate("/profile")}>
          My Profile
        </a>
        <a href="#logout" onClick={() => Logout(props.setCurrentPage)}>
          Logout
        </a>
      </div>
      <div className="contact-container">
        <h2>Contact Us:</h2>
        <div className="contact-info">Loc Nguyen : lnguye85@gmu.edu</div>
        <div className="contact-info">Shaan Ahmed : sahmed95@gmu.edu</div>
        <div className="contact-info">Udit Verma : uverma@gmu.edu</div>
      </div>
    </div>
  );
};

export default Contact;
