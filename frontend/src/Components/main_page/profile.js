import React from "react";
import emptypfp from "./images/emptypfp.png";
import "./home.css";
import { useNavigate, Navigate } from "react-router-dom";
import "./profile.css";
// When Logout is clicked
const Logout = (setCurrentPage) => {
  console.log("log");
  window.localStorage.removeItem("isLoggedIn");
  setCurrentPage = "";
  window.location.reload();
};

const Profile = (props) => {
  props.setCurrentPage("/profile");
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
          <a href="#about" onClick={() => navigate("/about")}>
            About
          </a>
          <a
            href="#MyProfile"
            onClick={() => navigate("/profile")}
            className="active"
          >
            My Profile
          </a>

          <a href="#logout" onClick={() => Logout(props.setCurrentPage)}>
            Logout
          </a>
        </div>
        <div className="profile-container">
          <img
            src={emptypfp}
            width={200}
            height={200}
            alt=""
            className="profile-image"
          />
          <div className="profile-name">
            <h1>{currentUser.name}</h1>
          </div>
          <div className="profile-contact-info">
            <p><b>Username:</b> {currentUser.username}</p>
            <p><b>ID:</b> {currentUser.id}</p>
            <p><b>Email Address:</b> {currentUser.email}</p>
            <p><b>Phone Number:</b> {currentUser.phone}</p>
            {/* TODO: <p>Listings: </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
