import React from "react";
import { useNavigate } from "react-router-dom";
import Listing from "./Listing";
const Sport = (props) => {
  const navigate = useNavigate();
  props.setCurrentPage("/sport");
  return (
    <>
      <div className="home-app">
        <h1 className="home-title">RENTGMU</h1>
        <button onClick={() => navigate("/home")} className="return-home-btn">
          Return Home
        </button>
      </div>
      <h1 className="Listing-type-title">Sport</h1>
      <div>
        <Listing />
      </div>
    </>
  );
};

export default Sport;