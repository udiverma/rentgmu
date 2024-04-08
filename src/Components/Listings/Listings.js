import React, { useState } from 'react';
import Modal from '../Modal/Modal'
import './listings.css'

const Box = ({ info, onRemove, onClick }) => (
  <div className="listings-box" onClick={() => onClick(info)}>
    <div className="listings-box-content">
      <div className='.listings-box-content-header'>
      <h2>Listing: {info.name}</h2>
      </div>
      <p className='.listings-box-content-description'>Description: {info.description}</p>
      <p className ='.listings-box-content-payment'>Payments: {info.payments}</p>
    </div>
    
    <button onClick={(e) => {
      e.stopPropagation(); // Prevent click from bubbling up to the box click
      onRemove();
    }}> 
    Remove
    </button>

  </div>
);

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);
  const initialBoxInfo = { name: '', contact: '', description: '' };
  const [newBoxInfo, setNewBoxInfo] = useState(initialBoxInfo);
  const [showModal, setShowModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  const handleFormSubmit = (boxData) => {
    const newBox = {
      id: boxes.length + 1,
      info: boxData,
    };
    setBoxes([...boxes, newBox]);
    setNewBoxInfo(initialBoxInfo)
    setShowModal(false);
  };

  const handleBoxClick = (boxInfo) => {
    setSelectedBox(boxInfo);
    setShowModal(true);
  };

  const removeBox = (id) => {
    setBoxes(boxes.filter(box => box.id !== id));
  };

  return (
    <>
    <div className="listings-header-container">
      <h1 className="listings-header-title">RENTGMU</h1>
      <nav className="listings-nav">
        <a className="listings-a" href="#home">Home</a>
        <a className="listings-a" href="#rent">Rent</a>
        <a className="listings-a" href="#contact">Contact Us</a>
      </nav>
    </div>
      <div className="listings-box-list">
          {boxes.map(box => (
            <Box key={box.id} info={box.info} onRemove={() => removeBox(box.id)} onClick={handleBoxClick} />
          ))}
        </div>
        <button className="listings-add-box-button" onClick={() => {setShowModal(true); setSelectedBox(null);}}>Add Box</button>
        {showModal && (
        <Modal 
          onModalClose={() => {setShowModal(false); setSelectedBox(null);}}
          onSubmit={handleFormSubmit}
          newBoxInfo={newBoxInfo}
          setNewBoxInfo={setNewBoxInfo}
          content = {selectedBox}
        />
      )}
    </>
  );
};

export default BoxList;
