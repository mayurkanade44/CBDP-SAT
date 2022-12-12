import { useState } from "react";
import { useSelector } from "react-redux";
import { InputRow, InputSelect } from "../components";

const Admin = () => {
  const { serviceName, allCatalogue, catalogueType } = useSelector(
    (store) => store.admin
  );
  const [showUser, setShowUser] = useState(false);

  const catalogues = allCatalogue.map((item) => item.catalogueType);
  console.log(catalogues);

  return (
    <div className="container-fluid ms-3">
      <h3 className="text-center my-3 text-success">Admin Dashboard</h3>
      <div className="row">
        <div className="col-2">
          <table className="table border border-3 ">
            <tbody className="text-center">
              <tr className="filter-button">
                <th>
                  <button className="btn">
                    <b>All Users</b>
                  </button>
                </th>
              </tr>
              <tr className="filter-button">
                <th>
                  <button className="btn">
                    <b>Add Document</b>
                  </button>
                </th>
              </tr>
              <tr className="filter-button">
                <th>
                  <button className="btn">
                    <b>Add Video</b>
                  </button>
                </th>
              </tr>
              <tr className="filter-button">
                <th>
                  <button className="btn">
                    <b>Add File Type</b>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-10">
          <form className="row">
            <div className="col-4">
              <InputSelect
                label="Completion"
                name="completion"
                value={catalogueType}
                data={["Select", ...catalogues]}
              />
            </div>
            <div className="col-4">
              <InputRow
                label="Service Name"
                name="serviceName"
                value={serviceName}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Admin;
