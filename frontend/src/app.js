import React from "react";
import "./app.css";
import SignInForm from "./Components/sign-in_page/sign-in.js";
import Home from "./Components/main_page/home.js";
import Contact from "./Components/main_page/contact.js";
import About from "./Components/main_page/about.js";
import Profile from "./Components/main_page/profile.js";
import SignUpForm from "./Components/sign-up_page/sign-up.js";
import { useState, useEffect } from "react";
import Stationary from "./Components/main_page/listings/stationary.js";
import Sport from "./Components/main_page/listings/sport.js";
import Technology from "./Components/main_page/listings/technology.js";
import Transportation from "./Components/main_page/listings/transportation.js";
import Start from "./start.js";
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
                <Stationary user={user} setCurrentPage={setCurrentPage} />
              }
            />
            <Route
              path="/sport"
              element={<Sport user={user} setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/transportation"
              element={
                <Transportation user={user} setCurrentPage={setCurrentPage} />
              }
            />
            <Route
              path="/technology"
              element={
                <Technology user={user} setCurrentPage={setCurrentPage} />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
