import { Accordion, ServiceDocuments } from "../components";

const Documents = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-3"></div>
        <div className="d-flex col-6">
          <div className="gallery-filter">
            <button className="btn btn-default filter-button">
              All Documents
            </button>
            <button className="btn btn-default filter-button">MSDS</button>
            <button className="btn btn-default filter-button">
              Technical Sheet
            </button>
            <button className="btn btn-default filter-button">SOP</button>
            <button className="btn btn-default filter-button">Videos</button>
            <button className="btn btn-default filter-button">
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
