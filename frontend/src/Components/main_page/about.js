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
        <div className="about-container">
          <div className="about-info">
            <h1>About RentGMU </h1>
            <br />
            <p>
              Welcome to RentGMU, your go-to platform for convenient renting and
              renting out of miscellaneous items tailored specifically for
              George Mason University (GMU) students. Founded by Shaan Ahmed,
              Loc Nguyen, and Udit Verma, RentGMU aims to simplify the process
              of accessing items needed for short-term or occasional use within
              the university community.
            </p>
            <br />
            <h2>Features</h2>
            <br />
            <p>
              RentGMU offers an innovative solution to the common dilemma faced
              by students: the need for items that are only required
              temporarily, such as calculators for exams, textbooks for specific
              classes, study aids like expo markers, or even a scooter to get
              around campus. Our platform functions similarly to popular online
              marketplaces, allowing users to find relevant listings with ease.
              Each user can showcase the items they are offering for rent, along
              with finding items to rent based on desired categories. Renters
              and item-owners are responsible for handling transaction as well
              as accounting for loss of items or damages. Our goal is to create
              an ease of access for students to rent out things while making
              some cash on the side; we're college students after all!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

