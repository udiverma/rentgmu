import React, { useState } from "react";
import "./sign-in.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignInForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  document.body.style.background = "seagreen";
  document.body.style.minHeight = "100vh";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API request to verify the username and password
    fetch('http://localhost:3001/verify-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        props.setIsUserSignedIn(true);
        window.localStorage.setItem("userInfo", JSON.stringify(data.user));
        window.localStorage.setItem("isLoggedIn", true);
        window.location.reload(); // Or use navigate for better SPA behavior
      } else {
        setError(data.message);
      }
    })
    .catch(() => {
      setError("Failed to connect to the server. Please try again later.");
    });

    setUsername("");
    setPassword("");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <h1 className="signin-title">RENTGMU</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={handleUsernameChange}
            />
            <FaUser className="icon" />
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

          {error && (
            <center>
              <p
                style={{
                  margin: "-15px 0 20px",
                  color: "#ffa",
                  position: "center",
                  fontSize: "12px",
                }}
              >
                {error}
              </p>
            </center>
          )}

          <button type="submit">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#signup" onClick={handleSignUp}>
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
