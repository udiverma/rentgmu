import React, { useState } from "react";
import Modal from "./modal.js";
import "./listing.css";

const stringifiedUser = window.localStorage.getItem("userInfo");
const currentUser = JSON.parse(stringifiedUser);

const Box = ({ info, onRemove, onClick }) => (
  <div className="listings-box" onClick={() => onClick(info)}>
    <div className="listings-box-content">
      <div className=".listings-box-content-header">
        <h2>Listing: {info.name}</h2>
      </div>
      <p className=".listings-box-content-description">
        Description: {info.description}
      </p>
      <p className=".listings-box-content-payment">Payments: {info.payments}</p>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling up to the box click
        onRemove();
      }}
    >
      Remove
    </button>
  </div>
);

const Listing = () => {
  const [boxes, setBoxes] = useState([]);
  const initialBoxInfo = { name: "", contact: "", description: "" };
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
        onClick={() => {
          setShowModal(true);
          setSelectedBox(null);
        }}
      >
        Add Box
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
