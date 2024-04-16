import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

const ItemCard = ({ item }, props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.Type === "stationary / textbooks") {
      navigate("/stationary");
    } else if (item.Type === "sport equipment") {
      navigate("/sport");
    } else if (item.Type === "transportation") {
      navigate("/transportation");
    } else if (item.Type === "technology") {
      navigate("/technology");
    }
    // window.location.reload();
  };
  return (
    <a href="#category" onClick={handleClick}>
      <div className="movie">
        <div>{/* <p>Date Posted: {item.Year}</p> */}</div>

        <div>
          <img
            src={
              item.Poster !== "N/A"
                ? item.Poster
                : "https://via.placeholder.com/400"
            }
            alt={item.title}
          />
        </div>

        <div>
          <span>{item.Type}</span>
          {/* <h3>{item.Title}</h3> */}
        </div>
      </div>
    </a>
  );
};

export default ItemCard;
