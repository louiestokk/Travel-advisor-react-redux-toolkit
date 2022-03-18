import React from "react";
import "./Footer.scss";
import { MdOutlineTravelExplore } from "react-icons/md";
const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-container">
        <div className="logo">
          <MdOutlineTravelExplore className="logo-icon" />
        </div>
        <h4>Traveladvisor {new Date().getFullYear()}</h4>
      </div>
    </div>
  );
};

export default Footer;
