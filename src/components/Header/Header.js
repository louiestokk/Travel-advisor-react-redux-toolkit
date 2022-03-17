import React from "react";
import "./Header.scss";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineTravelExplore } from "react-icons/md";
const Header = () => {
  return (
    <header>
      <div className="navbar"></div>
      <div className="nav-btn">
        <button>
          <AiOutlineBars />
        </button>
      </div>
      <div className="logo-container">
        <div className="logo">
          <MdOutlineTravelExplore className="logo-icon" />
        </div>
        <h4>Traveladvisor</h4>
      </div>
    </header>
  );
};

export default Header;
