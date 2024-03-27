import React from "react";
import "./Home.css";

const Home = (props) => {
  return (
    <>
      <div className="home-wrapper">
        <h1 className="home-title">RENTGMU</h1>
        <h2 className="home-username">Hello {props.user}</h2>
        <main className="home-main">
          <nav className="navigation">
            <ul>
              <li>a</li>
              <li>b</li>
              <li>c</li>
            </ul>
          </nav>

          <div className="main-content">this is the content page</div>
        </main>
        <div className="home-footer">This is the footer</div>
      </div>
    </>
  );
};

export default Home;
