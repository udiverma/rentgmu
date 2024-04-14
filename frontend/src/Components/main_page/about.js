import React from "react";
import "./home.css";
import { useNavigate, Navigate } from "react-router-dom";
// When Logout is clicked
const Logout = (setCurrentPage) => {
  console.log("log");
  window.localStorage.removeItem("isLoggedIn");
  setCurrentPage = "";
  window.location.reload();
};

const About = (props) => {
  props.setCurrentPage("/about");
  const stringifiedUser = window.localStorage.getItem("userInfo");
  const currentUser = JSON.parse(stringifiedUser);

  const navigate = useNavigate();

  return (
    <>
      <div className="home-app">
        <h1 className="home-title">RENTGMU</h1>
        <div className="topnav">
          <a href="#home" onClick={() => navigate("/home")}>
            Home
          </a>
          <a href="#contact" onClick={() => navigate("/contact")}>
            Contact
          </a>
          <a href="#about" className="active">
            About
          </a>
          <a href="#MyProfile" onClick={() => navigate("/profile")}>
            My Profile
          </a>

          <a href="#logout" onClick={() => Logout(props.setCurrentPage)}>
            Logout
          </a>
        </div>
        <div className="">about page</div>
      </div>
    </>
  );
};

export default About;
