import React from "react";

const Logout = (setCurrentPage) => {
  window.localStorage.removeItem("isLoggedIn");
  setCurrentPage = "";
  window.location.reload();
};
const Start = (props) => {
  if (window.localStorage.getItem("isLoggedIn") === true) {
    Logout(props.setCurrentPage);
  }

  return <></>;
};

export default Start;
