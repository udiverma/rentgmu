import React from "react";
import "./SignIn.css";
// import "./index.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import "../sign-up-page/SignUp.js";
import { useNavigate } from "react-router-dom";

const Loc = {
  Username: "loc",
  Password: "123",
  Name: "Loc",
  Id: 1,
  Email: "lnguye85@gmu.edu.com",
  Phone: "3154861688",
};

const John = {
  Username: "john",
  Password: "321",
  Name: "John",
  Id: 2,
  Email: "jdoe@gmu.edu.com",
  Phone: "1234567890",
};

const userList = [Loc, John];

const SignInForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const exampleUser = "loc";
  // const examplePass = "123";

  document.body.style.background = "seagreen";
  document.body.style.minHeight = "100vh";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    // Here you can use the username and password variables
    e.preventDefault();
    props.setIsUserSignedIn(true);
    console.log("Username:", username);
    console.log("Password:", password);

    let currentUser = null;
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].Username === username &&
        userList[i].Password === password
      ) {
        currentUser = userList[i];
      }
    }

    if (currentUser !== null) {
      props.setIsUserSignedIn(true);
      // props.setUser(Loc);
      window.localStorage.setItem("userInfo", JSON.stringify(currentUser));
      window.localStorage.setItem("isLoggedIn", true);
      // props.setIsLoggedIn(true);

      window.location.reload();
    } else {
      setError("Incorrect username or password, please try again");
    }

    setUsername("");
    setPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    window.localStorage.setItem("isLoggedIn", true);
    props.setCurrentPage("/signup");
    navigate("/signup");
  };

  // const handleSignUp = () => {
  //   console.log("sign UP");
  //   navigate()
  // };

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
                  fontSize: "12px",
                }}
              >
                {error}
              </p>
            </center>
          )}
          <div className="remember-forgot">
            {/* <label>
              <input type="checkbox" />
              Remember me
            </label> */}
            {/* <a href="#f">Forgot Password?</a> */}
          </div>

          <button type="submit" onClick={handleSubmit}>
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
