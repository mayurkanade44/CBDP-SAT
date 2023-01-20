import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  ServiceDocuments,
  Attach,
  SearchContainer,
} from "../components";
import { activeBtn } from "../redux/adminSlice";
import { filterDoc, getAllDocs, handleChange } from "../redux/documentSlice";

const Documents = () => {
  const { search } = useSelector((store) => store.doc);
  const { activeCatalogue, allCatalogue } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const [all, setAll] = useState(false);

  const files = allCatalogue?.filter(
    (item) => item.catalogueType === activeCatalogue && item.fileType
  );

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
    <div className="container-fluid page-top">
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
                onClick={() => dispatch(filterDoc({ name: item.fileType }))}
                key={item._id}
              >
                {item.fileType}
              </button>
            ))}
          </div>
        </div>
        <div className="col-3">
          <SearchContainer
            placeholder="File Name"
            name="search"
            value={search}
            handleChange={handleInput}
            handleSearch={handleSearch}
          />
        </div>
        <div className="col-md-3">
          <Accordion />
        </div>
        <div className="col-md-9">
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
