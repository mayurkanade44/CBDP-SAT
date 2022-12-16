import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import new1 from "../images/new.png";
import bag from "../images/bag.png";
import { latestDocs } from "../redux/documentSlice";

const Landing = () => {
  const { docLoading, newDocs } = useSelector((store) => store.doc);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(1);

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
  }, []);

  return (
    <div className="container">
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
      <div className="app">
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
      </div>
    </div>
  );
};
export default Landing;
