import React from "react";
import "./sign-up.css";
// import "./index.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function includeGmu(input) {
  const gmuRegex = /@gmu\.edu$/;
  return gmuRegex.test(input);
}

const SignUpForm = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  window.localStorage.removeItem("isLoggedIn");
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!includeGmu(email)) {
      setError("Please enter a GMU email");
    } else {
      fetch('http://18.207.114.103:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          name,
          email,
          phoneNumber
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Assuming the username is the part of the email before '@'
          const username = email.substring(0, email.indexOf('@'));
          
          // Store user information and login status in local storage
          window.localStorage.setItem("userInfo", JSON.stringify({ name, username, email, phoneNumber }));
          window.localStorage.setItem("isLoggedIn", "true");
  
          // Popup to inform the user about their username
          alert(`Your username is: ${username}`);
  
          // Navigate to the home page
          navigate('/home');
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError("Failed to register. Please try again later.");
      });
    }
  };
  

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <h1 className="signin-title">RENTGMU</h1>
      <div className="wrapper">
        <form action="">
          <h1>Sign up</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              required
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            <FaUser className="icon" />
          </div>

          {error && (
            <center>
              <p
                style={{
                  margin: "-15px 0 20px",
                  color: "#ffa",
                  position: "center",
                }}
              >
                {error}
              </p>
            </center>
          )}

          <button type="submit" onClick={handleSubmit}>
            Register
          </button>

          <div className="register-link">
            <p>
              return to{" "}
              <a href="#" onClick={reloadPage}>
                login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
