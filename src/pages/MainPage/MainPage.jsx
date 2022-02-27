import React from "react";
import "./MainPage.css";
import image1 from "./../../images/image1.png";
import image3 from "./../../images/image3.png";
import image2 from "./../../images/image2.png";

const MainPage = () => {
  return (
    <div>
      <div className="main__block">
        <div className="main__block_items">
          <h2>Sweat, Smile And Repeat</h2>
          <p>
            A gym is a club, building, or large room, usually containing special
            equipment
          </p>
          <p> Exercise can improve your health and reduce the risk of</p>
        </div>
        <img style={{ width: "600px" }} src={image1} alt="image1" />
      </div>
      <div className="main__block">
        <img src={image3} alt="" />
        <div className="main__block_items">
          <h2>Physical Exercise Gives Your Body The Wings</h2>
          <p>
            Physical activity and exercise can have immediate and long-term
            health benefits. Most importantly, regular activity can improve your
            quality of life.
          </p>
        </div>
      </div>
      <div className="main__block">
        <div className="main__block_items">
          <h2>Makes You More Active And Improve Moods</h2>
          <p>
            Physical activity and exercise can have immediate and long-term
            health benefits. Most importantly, regular activity can improve your
            quality of life.Exercise can improve your health and reduce the risk
            of{" "}
          </p>
        </div>
        <img src={image2} alt="logo" />
      </div>
    </div>
  );
};

export default MainPage;
