import React, { useState } from "react";
import "./Modal.css";

const APIendpoint =
  "https://3x5nwysg5e.execute-api.us-east-1.amazonaws.com/default/rent_gmu";
const stringifiedUser = window.localStorage.getItem("userInfo");
const currentUser = JSON.parse(stringifiedUser);

export default function Modal({
  onSubmit,
  onModalClose,
  newBoxInfo,
  setNewBoxInfo,
  content,
  owner,
}) {
  const sendRequest = async () => {
    try {
      const message =
        "Hello " +
        owner.Name +
        ", " +
        currentUser.Name +
        " is requesting to rent your item: [" +
        content.name +
        "]. Please contact them with this phone number: " +
        currentUser.Phone;

      const ownerNum = "+1" + owner.Phone;
      const response = await fetch(APIendpoint, {
        method: "POST",
        body: JSON.stringify({ Text: message, Phone: ownerNum }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
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
              <p>Description: {content.description}</p>
              <p>Payments: {content.payments}</p>
              <button onClick={sendRequest} className="modal-rent-item-btn">
                Rent Item
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <h2>Add New Listing</h2>
              <div>
                Name:
                <input
                  type="text"
                  value={newBoxInfo.name}
                  onChange={(e) =>
                    setNewBoxInfo({ ...newBoxInfo, name: e.target.value })
                  }
                  required
                  className="modal-entry"
                />
              </div>
              <div>
                Description:
                <input
                  type="text"
                  value={newBoxInfo.description}
                  onChange={(e) =>
                    setNewBoxInfo({
                      ...newBoxInfo,
                      description: e.target.value,
                    })
                  }
                  required
                  className="modal-entry"
                />
              </div>
              <div>
                Payment Methods:
                <input
                  type="text"
                  value={newBoxInfo.payments}
                  onChange={(e) =>
                    setNewBoxInfo({ ...newBoxInfo, payments: e.target.value })
                  }
                  required
                  className="modal-entry"
                />
              </div>
              <div>
                Image:
                <input
                  type="file"
                  onChange={(e) =>
                    setNewBoxInfo({ ...newBoxInfo, image: e.target.files[0] })
                  }
                />
              </div>
              <button className="modal-submit" type="submit">
                Submit
              </button>
            </form>
          )}
          <button className="close-modal" onClick={onModalClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
