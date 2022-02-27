import React from "react";
import "./Footer.css";
import logo from "./../../images/logo.png";
import social from "./../../images/social.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer_left">
          <img style={{ width: "50px" }} src={logo} alt="" />
          <p>
            A Modified Fitness Store that provide fitness & nutrition related
            services to improve your health
          </p>
          <img src={social} alt="" />
        </div>
        <div className="footer_right">
          <div>
            <h4>Resources</h4>
            <p>Catalog</p>
            <p>Pricing</p>
            <p>Activity</p>
          </div>
          <div>
            <h4>About</h4>
            <p>FaQs</p>
            <p>Policy</p>
            <p>Contact</p>
          </div>
          <div>
            <h4>Helpful Links</h4>
            <p>Articles</p>
            <p>Nutritions</p>
            <p>Services</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
