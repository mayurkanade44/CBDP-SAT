import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputRow, InputSelect } from "../components";
import { addCatalogue, handleAdminChange } from "../redux/adminSlice";
import { adminController } from "../utilis/data";

const Admin = () => {
  const { serviceName, allCatalogue, catalogueType } = useSelector(
    (store) => store.admin
  );
  const [showUser, setShowUser] = useState(false);
  const dispatch = useDispatch();

  const catalogues = [];
  allCatalogue.map(
    (item) =>
      !catalogues.includes(item.catalogueType) &&
      catalogues.push(item.catalogueType)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCatalogue({ catalogueType, serviceName }));
  };

  return (
    <div className="container-fluid ms-3">
      <h3 className="text-center my-3 text-success">Admin Dashboard</h3>
      <div className="row">
        <div className="col-2">
          <table className="table border border-3 ">
            <tbody className="text-center">
              {adminController.map((item) => {
                return (
                  <tr className="filter-button" key={item.id}>
                    <th>
                      <button className="btn">
                        <b>{item.name}</b>
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-10">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-4">
              <InputSelect
                label="Completion"
                name="catalogueType"
                value={catalogueType}
                data={["Select", ...catalogues]}
                handleChange={(e) =>
                  dispatch(
                    handleAdminChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="col-4">
              <InputRow
                label="Service Name"
                name="serviceName"
                value={serviceName}
                handleChange={(e) =>
                  dispatch(
                    handleAdminChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary mt-1" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Admin;
