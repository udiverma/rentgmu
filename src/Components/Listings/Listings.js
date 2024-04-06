import React, { useState } from 'react';


const Box = ({ value, onRemove }) => (
  <div className="listings-box">
    <div className="listings-box-content">{value}</div>
    <button onClick={onRemove}>Remove</button>
  </div>
);

const BoxList = () => {
  const [boxes, setBoxes] = useState([
    {id: 1},

  ]);

  const addBox = () => {
    const newBox = {
      id: boxes.length + 1,
    };
    setBoxes([...boxes, newBox]);
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
            <Box key={box.id} value={box.value} onRemove={() => removeBox(box.id)} />
          ))}
        </div>
        <button className="listings-add-box-button" onClick={addBox}>Add Box</button>
    </>
  );
};

export default BoxList;
