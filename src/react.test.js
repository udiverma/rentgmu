import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Components/Main-page/Home.js";
import About from "./Components/Main-page/About.js";
import Contact from "./Components/Main-page/Contact.js";
import Listing from "./Components/Main-page/Listings/Listing.js";
import Sport from "./Components/Main-page/Listings/Sport.js";
import Stationary from "./Components/Main-page/Listings/Stationary.js";
import Technology from "./Components/Main-page/Listings/Technology.js";
import Transportation from "./Components/Main-page/Listings/Transportation.js";
import SignIn from "./Components/Sign-in-page/SignIn.js";
import SignUpForm from "./Components/sign-up-page/SignUp.js";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("All components", () => {
  it("Home renders without crashing", () => {
    render(<Home setCurrentPage={() => {}} />);
  });

  it("About renders without crashing", () => {
    render(<About setCurrentPage={() => {}} />);
  });

  it("Contact renders without crashing", () => {
    render(<Contact setCurrentPage={() => {}} />);
  });
  it("Listing renders without crashing", () => {
    render(<Listing setCurrentPage={() => {}} />);
  });
  it("Sport renders without crashing", () => {
    render(<Sport setCurrentPage={() => {}} />);
  });

  it("Stationary renders without crashing", () => {
    render(<Stationary setCurrentPage={() => {}} />);
  });
  it("Technology renders without crashing", () => {
    render(<Technology setCurrentPage={() => {}} />);
  });
  it("Transportation renders without crashing", () => {
    render(<Transportation setCurrentPage={() => {}} />);
  });
  it("SignIn renders without crashing", () => {
    render(<SignIn setCurrentPage={() => {}} />);
  });

  it("SignUp renders without crashing", () => {
    render(<SignUpForm setCurrentPage={() => {}} />);
  });
});
