import { useState, useEffect, React } from "react";
import "./MainContent.scss";
import Fade from "react-reveal/Fade";
const MainContent = () => {
  const [loading, setLoading] = useState(true);
  const [fullReferal, setFullReferal] = useState([]);
  const [referals, setReferals] = useState([]);
  const [none, setNone] = useState(false);
  const [inputClass, SetinputClass] = useState(
    "Filter__container__searchBox__hidden"
  );
  const [toggle, setToggle] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const setInputClass = () => {
    if (toggle) {
      SetinputClass("Filter__container__searchBox__hidden");
      setToggle(false);
    } else {
      SetinputClass("Filter__container__searchBox__input");
      setToggle(true);
    }
  };

  const handleSearch = async (referals, name) => {
    if (name !== "") {
      let lowercaseName = name.toLowerCase();
      console.log(lowercaseName);
      let filtered = [];
      filtered = referals.filter(
        (referal) => referal.name.indexOf(lowercaseName) !== -1
      );
      if (filtered.length > 0) {
        console.log(referals);
        setReferals(filtered);
        console.log(referals);
        setNone(false);
      } else {
        setNone(true);
      }
    } else {
      setReferals(fullReferal);
    }
  };

  const hanldeShowFilters = () => {
    setShowFilter(true);
    setFilterToggle(true);
  };
  const handleFilterClose = () => {
    setFilterToggle(false);
    setShowFilter(false);
  };
  const handleMovieClick = (referals) => {
    let filtered = [];
    filtered = referals.filter((referal) => 
      referal.category.indexOf("movie") !== -1
    );
    setReferals(filtered);
    setShowFilter(false);
  };
  const handleAllClick = () => {
    setReferals(fullReferal);
    setShowFilter(false)
  }

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
      setLoading(false);
      setFullReferal(result);
    };
    getReferals();
  }, []);

  return (
    <div className="MainContent__container">
      <h1 className="MainContent__container__banner">Top 100 Used Referral</h1>
      <div className="Filter__container">
        <div className="Filter__container__searchBox">
          <img
            className="Filter__container__searchBox__icon"
            src="./images/white-search.png"
            alt="search-icon"
            onClick={() => setInputClass()}
          />
          <Fade>
            <input
              className={inputClass}
              type={"text"}
              placeholder="search"
              onChange={(e) => handleSearch(referals, e.target.value)}
            />
          </Fade>
        </div>
        <div className="Filter__container__filterBox">
          <div className="Filter__container__filterBox__container">
            {!filterToggle && (
              <a
                className="Filter__container__filterBox__container__link__hidden"
                onClick={() => hanldeShowFilters()}
              >
                Filter
              </a>
            )}
            {filterToggle && (
              <a
                className="Filter__container__filterBox__container__link__visible"
                onClick={() => hanldeShowFilters()}
              >
                Filter
              </a>
            )}
            {showFilter && (
              <Fade>
                <div className="Filter__container__filterBox__container__content">
                  <img
                    className="Filter__container__filterBox__container__content__close"
                    src="./images/close-icon.png"
                    alt="close-icon"
                    onClick={() => handleFilterClose()}
                  />
                  <div className="Filter__container__filterBox__container__content__category">
                    <a onClick={() => handleAllClick()}>All</a>
                  </div>
                  <div className="Filter__container__filterBox__container__content__category">
                    <a onClick={() => handleMovieClick(referals)}>Movie</a>
                  </div>
                  <div className="Filter__container__filterBox__container__content__category">
                    <a>Sport</a>
                  </div>
                  <div className="Filter__container__filterBox__container__content__category">
                    <a>Music</a>
                  </div>
                  <div className="Filter__container__filterBox__container__content__category">
                    <a>Crypto</a>
                  </div>
                  <div className="Filter__container__filterBox__container__content__category">
                    <a>Games</a>
                  </div>
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div>
      <div className="MainContent__container__content">
        {loading && (
          <div>
            <p>We're loading referals for you</p>
            <p>Thank's for your patience</p>
          </div>
        )}
        {!none &&
          !loading &&
          referals.map((r, index) => (
            <div className="MainContent__container__content__singleReferal">
              <div className="MainContent__container__content__singleReferal__content">
                {<p style={{ marginRight: "20px" }}>{index + 1 + " ."}</p>}
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
                  <a target="blank" href={r.link}>
                    Go!
                  </a>
                </button>
              </div>
              <div className="MainContent__container__content__singleReferal__separator"></div>
            </div>
          ))}
        {none && (
          <div className="MainContent__container__content__singleReferal">
            <div className="MainContent__container__content__singleReferal__content">
              <p className="MainContent__container__content__singleReferal__content__title">
                no referals found for searched name
              </p>
            </div>
            <div className="MainContent__container__content__singleReferal__separator"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
