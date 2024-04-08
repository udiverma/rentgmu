import React, { useState } from "react";
import "./modal.css";

export default function Modal({ onSubmit, onModalClose, newBoxInfo, setNewBoxInfo, content }) {
    const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newBoxInfo); // This will pass the newBoxInfo state up to the parent component
    onModalClose(); // This will close the modal
  };

  return (
    <>
    <div className="modal">
      <div onClick={onModalClose} className="overlay"></div>
      <div className="modal-content">
      {content ? (
        // Display the clicked box's details
        <>
          <h2>{content.name}</h2>
          <p>Payments: {content.payments}</p>
          <p>Description: {content.description}</p>
          <button>Rent Item</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Add New Listing</h2>
          <label>
            Name:
            <input
              type="text"
              value={newBoxInfo.name}
              onChange={(e) => setNewBoxInfo({...newBoxInfo, name: e.target.value})}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={newBoxInfo.description}
              onChange={(e) => setNewBoxInfo({...newBoxInfo, description: e.target.value})}
              required
            />
          </label>
          <label>
            Payment Methods:
            <input
              type="text"
              value={newBoxInfo.payments}
              onChange={(e) => setNewBoxInfo({...newBoxInfo, payments: e.target.value})}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onModalClose}>Close</button>
        </form>
      )}
        <button className="close-modal" onClick={onModalClose}>
          CLOSE
        </button>
      </div>
      </div>
    </>
  );
}