import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, ServiceDocuments } from "../components";
import { activeBtn } from "../redux/adminSlice";
import { filterDoc, getAllDocs, handleChange } from "../redux/documentSlice";
import Attach from "./Attach";

const Documents = () => {
  const { search } = useSelector((store) => store.doc);
  const { activeCatalogue } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);

  const files = [];

  if (activeCatalogue === "Services" || activeCatalogue === "Products") {
    files.length = 0;
    files.push("MSDS", "SOP", "Videos", "Technical Resources");
  } else {
    files.length = 0;
    files.push("Corporate Details", "PO", "Completion Letter", "Feedback");
  }

  useEffect(() => {
    dispatch(getAllDocs(search));

    // eslint-disable-next-line
  }, [all]);

  const getDocs = () => {
    dispatch(activeBtn({ name: "", catalogue: "Services" }));
    dispatch(handleChange({ name: "search", value: "" }));
    setAll(!all);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(activeBtn({ name: "" }));
    setAll(!all);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-3"></div>
        <div className="d-flex col-6">
          <div className="gallery-filter">
            <button className="btn btn-default filter-button" onClick={getDocs}>
              All
            </button>
            {files.map((item) => (
              <button
                className="btn btn-default filter-button"
                onClick={() => dispatch(filterDoc({ name: item }))}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="col-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="File Name"
              name="search"
              value={search}
              onChange={handleInput}
            />
            <button
              className="input-group-text btn btn-primary"
              id="basic-addon2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-3">
          <Accordion />
        </div>
        <div className="col-9">
          <div className="collapse mb-3" id="collapseExample">
            <div className="card card-body">
              <Attach />
            </div>
          </div>
          <ServiceDocuments />
        </div>
      </div>
    </div>
  );
};
export default Documents;
