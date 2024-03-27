import React from "react";
import "./SignIn.css";
import "./index.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

const SignInForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const exampleUser = "loc";
  const examplePass = "123";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    // Here you can use the username and password variables
    e.preventDefault();
    // props.setIsUserSignedIn(true);
    console.log("Username:", username);
    console.log("Password:", password);

    if (username === exampleUser && password === examplePass) {
      props.setIsUserSignedIn(true);
      props.setUser(username);
      props.setbgColor("yellow");
    } else {
      setError("Incorrect username or password, please try again");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1 className="signin-title">RENTGMU</h1>
      <div className="wrapper">
        <form action="">
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
                }}
              >
                {error}
              </p>
            </center>
          )}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Signup</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
