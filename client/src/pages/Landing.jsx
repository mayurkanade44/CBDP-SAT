import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import new1 from "../images/new.png";
import bag from "../images/bag.png";
import first from "../images/poll.png";
import second from "../images/fog1.jpeg";
import third from "../images/stq.jpg";

import { latestDocs } from "../redux/documentSlice";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { newDocs } = useSelector((store) => store.doc);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(1);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      url: new1,
      name: "Writing Course",
      topicList: 100,
      shortName: "Writing",
    },
    {
      id: 2,
      url: bag,
      name: "Coding Course",
      topicList: 120,
      shortName: "Coding",
    },
    {
      id: 3,
      url: new1,
      name: "Business Course",
      topicList: 150,
      shortName: "Business",
    },
    {
      id: 4,
      url: bag,
      name: "Business Course",
      topicList: 150,
      shortName: "Business",
    },
    {
      id: 5,
      url: new1,
      name: "Business Course",
      topicList: 150,
      shortName: "Business",
    },
  ];

  const handleHover = (id) => {
    if (activeItem === id) {
      return;
    }
    setActiveItem(id);
  };

  const handleHoverLeave = () => {
    if (activeItem === 1) {
      return;
    }
    setActiveItem(1);
  };

  useEffect(() => {
    dispatch(latestDocs());
    if (user) {
      setTimeout(() => {
        navigate("/documents");
      }, 1000);
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="container" style={{marginTop:95}}>
      <div className="row">
        {newDocs?.map((item) => {
          return (
            <div
              className="col-4 pt-3 d-flex justify-content-center"
              key={item._id}
            >
              <img src={new1} alt="new" width={40} className="me-1" />
              <p className="pt-2 mb-1">{item.name} has been added</p>
            </div>
          );
        })}
      </div>
      <hr />
      {/* <div className="app">
        <div className="wrapper">
          <div className="container-wrapper">
            <div className="container-img">
              {data.map((item) => (
                <div
                  className={item.id === activeItem ? "active" : "item-wrapper"}
                  onMouseOver={() => handleHover(item.id)}
                  onMouseLeave={() => handleHoverLeave(item.id)}
                  key={item.id}
                >
                  <div
                    className={item.id === activeItem ? "item-active" : "item"}
                  >
                    <div
                      className={
                        item.id === activeItem
                          ? "container-wrap1-active"
                          : "container-wrap1"
                      }
                    >
                      <div className="fullName">{item.name}</div>
                    </div>
                    <div
                      className={
                        item.id === activeItem
                          ? "container-wrap2-active"
                          : "container-wrap2"
                      }
                    >
                      <div className="shortName">{item.shortName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: 400 }}>
            <img src={first} className="img-fluid ad" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" style={{ height: 400 }}>
            <img src={second} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" style={{ height: 400 }}>
            <img src={third} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Landing;
