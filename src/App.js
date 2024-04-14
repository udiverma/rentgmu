import React from "react";
import "./App.css";
import SignInForm from "./Components/Sign-in-page/SignIn.js";
import Home from "./Components/Main-page/Home.js";
import Contact from "./Components/Main-page/Contact.js";
import About from "./Components/Main-page/About.js";
import Profile from "./Components/Main-page/Profile.js";
import SignUpForm from "./Components/sign-up-page/SignUp.js";
import { useState, useEffect } from "react";
import Stationary from "./Components/Main-page/Listings/Stationary.js";
import Sport from "./Components/Main-page/Listings/Sport.js";
import Technology from "./Components/Main-page/Listings/Technology.js";
import Transportation from "./Components/Main-page/Listings/Transportation.js";
import Start from "./Start.js";
// import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

//npm install react-router-dom

function App() {
  // let userName = "abc";
  // let passWord = "123";

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  // const [user, setUser] = useState({});
  const [bgColor, setbgColor] = useState("seagreen");
  const [currentPage, setCurrentPage] = useState("/Home");

  useEffect(() => {
    // document.body.style.background = bgColor;
    document.body.style.display = "";
  }, [bgColor]);

  // let isUserSignedIn = true;

  // let content = !isUserSignedIn ? <SignInForm setIsUserSignedIn={setIsUserSignedIn} setUser={setUser} setbgColor={setbgColor}/>: <Home user={user}/> ;

  console.log("HI");

  // console.log(content);

  const login = window.localStorage.getItem("isLoggedIn");
  const user = window.localStorage.getItem("user");

  console.log("login status: " + login);

  return (
    <>
      <Router>
        {login ? (
          // console.log("current: " + currentPage)
          <Navigate to={currentPage} />
        ) : (
          <Navigate to="/login" />
        )}
        <main>
          <Routes>
            <Route path="/" />
            <Route
              path="/login"
              element={
                <SignInForm
                  setCurrentPage={setCurrentPage}
                  setIsUserSignedIn={setIsUserSignedIn}
                  // setUser={setUser}
                  setbgColor={setbgColor}
                />
              }
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/home"
              element={<Home user={user} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/start"
              element={<Start setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/contact"
              element={<Contact user={user} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/about"
              element={<About user={user} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/stationary"
              element={
                <Stationary
                  user={user}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              }
            />
            <Route
              path="/sport"
              element={
                <Sport
                  user={user}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              }
            />
            <Route
              path="/transportation"
              element={
                <Transportation
                  user={user}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <Technology
                  user={user}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
