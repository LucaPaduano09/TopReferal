import React from "react";
import "./MainHeader.scss";
const MainHeader = () => {
  return (
    <div className="MainHeader__container">
      <div className="MainHeader__container__logo">
        <img src="./images/logoTop.png" alt="logoImage" />
      </div>
      <div className="MainHeader__container__menu">
        <a href="" className="MainHeader__container__menu__link">
          Music
        </a>
        <a href="" className="MainHeader__container__menu__link">
          Shows
        </a>
        <a href="" className="MainHeader__container__menu__link">
          Sports
        </a>
        <a href="" className="MainHeader__container__menu__link">
          Crypto
        </a>
        <div className="progressBar"></div>
      </div>
    </div>
  );
};

export default MainHeader;
