import { useState } from "react";
import { useDispatch } from "react-redux";
import { Accordion, ServiceDocuments } from "../components";
import { activeBtn } from "../redux/catalogueSlice";
import { filterDoc, getAllDocs } from "../redux/documentSlice";

const Documents = () => {
  const dispatch = useDispatch();
  const [all, setAll] = useState("");

  const getDocs = () => {
    dispatch(getAllDocs());
    dispatch(activeBtn({ name: "" }));
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
            />
            <button
              className="input-group-text btn btn-primary"
              id="basic-addon2"
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-3">
          <Accordion setAll={setAll} />
        </div>
        <div className="col-9">
          <ServiceDocuments />
        </div>
      </div>
    </div>
  );
};
export default Documents;
