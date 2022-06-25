import { useState, useEffect, React } from "react";
import "./MainContent.scss";
const MainContent = () => {
  const [referals, setReferals] = useState([]);
  const [none, setNone] = useState(false);
  const [inputClass, SetinputClass] = useState(
    "Filter__container__searchBox__hidden"
  );
  const [toggle, setToggle] = useState(false);

  const setInputClass = () => {
    if (toggle) {
      SetinputClass("Filter__container__searchBox__hidden");
      setToggle(false);
    } else {
      SetinputClass("Filter__container__searchBox__input");
      setToggle(true);
    }
  };

  const handleSearch = (referals, name) => {
    let filtered = null;
    filtered = referals.filter((referal) => referal.name.indexOf(name) !== -1);
    if (filtered.length > 0) {
      setReferals(filtered);
      setNone(false)
    } else {
      setNone(true);
      setReferals([{name:"",code:"",image:""}]);
    }
  };

  useEffect(() => {
    const getReferals = async () => {
      let response = await fetch("https://topreferal.herokuapp.com/referal", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("error while fetching referal codes");
      }

      let result = await response.json();
      setReferals(result);
    };
    getReferals();
  });

  return (
    <div className="MainContent__container">
      <h1 className="MainContent__container__banner">Top 100 Used Referal</h1>
      <div className="Filter__container">
        <div className="Filter__container__searchBox">
          <img
            className="Filter__container__searchBox__icon"
            src="./images/search-icon.png"
            alt="search-icon"
            onClick={() => setInputClass()}
          />
          <input
            className={inputClass}
            type={"text"}
            placeholder="search"
            onChange={(e) => handleSearch(referals, e.target.value)}
          />
        </div>
      </div>
      <div className="MainContent__container__content">
        {!none &&
          referals.map((r, index) => (
            <div className="MainContent__container__content__singleReferal">
              <div className="MainContent__container__content__singleReferal__content">
                {index + 1 + " ."}
                <img
                  className="MainContent__container__content__singleReferal__content__image"
                  src={r.image}
                  alt="ref-image"
                />
                <p className="MainContent__container__content__singleReferal__content__title">
                  {r.name}
                </p>
                <p className="MainContent__container__content__singleReferal__content__code">
                  {r.code}
                </p>
                <button className="MainContent__container__content__singleReferal__content__button">
                  Copy
                </button>
              </div>
              <div className="MainContent__container__content__singleReferal__separator"></div>
            </div>
          ))}
          {
            none && 
            <div className="MainContent__container__content__singleReferal">
              <div className="MainContent__container__content__singleReferal__content">
                <p className="MainContent__container__content__singleReferal__content__title">
                  no referals found for searched name
                </p>
              </div>
              <div className="MainContent__container__content__singleReferal__separator"></div>
            </div>
          }
      </div>
    </div>
  );
};

export default MainContent;
