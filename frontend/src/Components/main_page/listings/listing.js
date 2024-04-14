import React, { useState } from "react";
import Modal from "./modal.js";
import "./listing.css";

const stringifiedUser = window.localStorage.getItem("userInfo");
const currentUser = JSON.parse(stringifiedUser);

const Box = ({ info, onRemove, onClick }) => {
  const imageUrl = info.image
    ? URL.createObjectURL(info.image)
    : "placeholder-image-url";
  return (
    <div className="listings-box" onClick={() => onClick(info)}>
      <div className="listings-box-content">
        <div className=".listings-box-content-header">
          <h3 className=".listings-box-content-header-name">{info.name}</h3>
          {info.image && (
            <img src={imageUrl} alt="Uploaded content" className="img" />
          )}
        </div>
        {/* <p className=".listings-box-content-description">
          Description: {info.description}
        </p>
        <p className=".listings-box-content-payment">
          Payments: {info.payments}
        </p> */}
      </div>
      <button
        className="listings-box-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from bubbling up to the box click
          onRemove();
        }}
      >
        Remove
      </button>
    </div>
  );
};

const Listing = () => {
  const [boxes, setBoxes] = useState([]);
  const initialBoxInfo = {
    name: "",
    contact: "",
    description: "",
    image: null,
  };
  const [newBoxInfo, setNewBoxInfo] = useState(initialBoxInfo);
  const [showModal, setShowModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleFormSubmit = (boxData) => {
    const newBox = {
      id: boxes.length + 1,
      info: boxData,
    };
    setBoxes([...boxes, newBox]);
    setNewBoxInfo(initialBoxInfo);
    setShowModal(false);
    setNewBoxInfo(initialBoxInfo);
  };

  const handleBoxClick = (boxInfo) => {
    setSelectedBox(boxInfo);
    setShowModal(true);
  };

  const removeBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  return (
    <>
      <div className="listings-box-list">
        {boxes.map((box) => (
          <Box
            key={box.id}
            info={box.info}
            onRemove={() => removeBox(box.id)}
            onClick={handleBoxClick}
          />
        ))}
      </div>
      <button
        className="listings-add-box-button"
        title="Add new listing"
        onClick={() => {
          setShowModal(true);
          setSelectedBox(null);
        }}
      >
        <div className="plus-text">+</div>
      </button>
      {showModal && (
        <Modal
          onModalClose={() => {
            setShowModal(false);
            setSelectedBox(null);
          }}
          onSubmit={handleFormSubmit}
          newBoxInfo={newBoxInfo}
          setNewBoxInfo={setNewBoxInfo}
          content={selectedBox}
          owner={currentUser}
        />
      )}
    </>
  );
};

export default Listing;
