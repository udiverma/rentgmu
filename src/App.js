import React from "react";
import "./App.css";
import SignInForm from "./Components/Sign-in-page/SignIn.js";
import Home from "./Components/Main-page/Home.js";
import { useState, useEffect } from "react";
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
  const [user, setUser] = useState("");
  const [bgColor, setbgColor] = useState("seagreen");

  useEffect(() => {
    document.body.style.background = bgColor;
  }, [bgColor]);

  // let isUserSignedIn = true;

  // let content = !isUserSignedIn ? <SignInForm setIsUserSignedIn={setIsUserSignedIn} setUser={setUser} setbgColor={setbgColor}/>: <Home user={user}/> ;

  console.log("HI");

  // console.log(content);

  return (
    <>
      <Router>
        {isUserSignedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
        <main>
          <Routes>
            <Route path="/" />

            <Route
              path="/login"
              element={
                <SignInForm
                  setIsUserSignedIn={setIsUserSignedIn}
                  setUser={setUser}
                  setbgColor={setbgColor}
                />
              }
            />

            <Route path="/home" element={<Home user={user} />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
