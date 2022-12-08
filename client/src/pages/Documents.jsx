import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, ServiceDocuments } from "../components";
import { activeBtn } from "../redux/catalogueSlice";
import { filterDoc, getAllDocs, handleChange } from "../redux/documentSlice";

const Documents = () => {
  const { search } = useSelector((store) => store.doc);
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);

  useEffect(() => {
    dispatch(getAllDocs({ search }));
    // if (search) {
    //   setTimeout(() => {
    //     dispatch(getAllDocs({ search }));
    //   }, 1000);
    // } else {
    // }
  }, [all]);

  const getDocs = () => {
    dispatch(activeBtn({ name: "" }));
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

            <button
              className="btn btn-default filter-button"
              onClick={() => dispatch(filterDoc({ name: "MSDS" }))}
            >
              MSDS
            </button>

            <button
              className="btn btn-default filter-button"
              onClick={() => dispatch(filterDoc({ name: "SOP" }))}
            >
              SOP
            </button>
            <button
              className="btn btn-default filter-button"
              onClick={() => dispatch(filterDoc({ name: "Videos" }))}
            >
              Videos
            </button>
            <button
              className="btn btn-default filter-button"
              onClick={() =>
                dispatch(filterDoc({ name: "Technical Resources" }))
              }
            >
              Technical Resources
            </button>
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
          <ServiceDocuments />
        </div>
      </div>
    </div>
  );
};
export default Documents;
