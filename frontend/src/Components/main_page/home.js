import React, { useState, useEffect } from "react";
import "./home.css";
import SearchIcon from "./images/search.svg";
import ItemCard from "./item-card.js";
import { useNavigate, Navigate } from "react-router-dom";
import statpic from "./images/stationary.jpg";
import sportpic from "./images/sport.jpg";
import transpic from "./images/transportation.jpg";
import techpic from "./images/tech.jpg";

// API key from OMDB API:  fe19dab8

const API_URL = "http://www.omdbapi.com?apikey=fe19dab8";

const stationary = {
  Title: "Pencil",
  Year: "3/28/2024",
  Type: "stationary",
  Poster: statpic,
};

const transportation = {
  Title: "Razor Scooter",
  Year: "3/25/2024",
  Type: "transportation",
  Poster: transpic,
};

const sport = {
  Title: "Football",
  Year: "3/25/2024",
  Type: "sport",
  Poster: sportpic,
};

const technology = {
  Title: "Calculator",
  Year: "3/25/2024",
  Type: "technology",
  Poster: techpic,
};

// const exampleItems = [stationary,tr];

// When Logout is clicked
const Logout = (setCurrentPage) => {
  console.log("log");
  window.localStorage.removeItem("isLoggedIn");
  setCurrentPage = "";
  window.location.reload();
};

const Home = (props) => {
  console.log("STATUS: " + window.localStorage.getItem("isLoggedIn"));
  props.setCurrentPage("/home");

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    searchItems("");
  }, []);

  //Search for item
  const searchItems = async (title) => {
    if (searchTerm !== "") {
      // call API
      const response = await fetch(`${API_URL}&s=${title}`);

      const data = await response.json();

      setItems(data.Search);
    }
  };

  // When home tab is clicked
  const HomeClicked = () => {
    setSearchTerm("");
    searchItems(searchTerm);
    window.location.reload();
  };

  document.body.style.background = "#ffec8b";
  document.body.style.minHeight = "0";

  document.body.style.display = "";

  const stringifiedUser = window.localStorage.getItem("userInfo");
  const currentUser = JSON.parse(stringifiedUser);

  return (
    <div className="home-app">
      <h1 className="home-title">RENTGMU</h1>
      <div className="topnav">
        <a className="active" href="#home" onClick={() => HomeClicked()}>
          Home
        </a>
        <a href="#contact" onClick={() => navigate("/contact")}>
          Contact
        </a>
        <a href="#about" onClick={() => navigate("/about")}>
          About
        </a>
        <a href="#MyProfile" onClick={() => navigate("/profile")}>
          My Profile
        </a>

        <a href="#logout" onClick={() => Logout(props.setCurrentPage)}>
          Logout
        </a>
      </div>
      {/* <div className="search">
        <input
          placeholder="Search for Items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchItems(searchTerm)}
        />
      </div> */}
      {console.log(items)};
      {items?.length > 0 ? (
        <div className="container">
          {items.map((item) => (
            <ItemCard item={item} />
          ))}
        </div>
      ) : (
        // <div className="empty">
        //   <h2>No Items Found</h2>
        // </div>
        <div className="container">
          <ItemCard item={stationary} />
          <ItemCard item={sport} />
          <ItemCard item={technology} />
          <ItemCard item={transportation} />
        </div>
      )}
      ;
    </div>
  );
};

export default Home;

// import React from "react";
// import "./Home.css";

// const Home = (props) => {
//   return (
//     <>
//       <div className="home-wrapper">
//         <h1 className="home-title">RENTGMU</h1>
//         <h2 className="home-username">Hello {props.user}</h2>
//         <main className="home-main">
//           <nav className="navigation">
//             <ul>
//               <li>a</li>
//               <li>b</li>
//               <li>c</li>
//             </ul>
//           </nav>

//           <div className="main-content">this is the content page</div>
//         </main>
//         <div className="home-footer">This is the footer</div>
//       </div>
//     </>
//   );
// };

// export default Home;
