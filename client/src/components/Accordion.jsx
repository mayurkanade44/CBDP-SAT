import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCatalogue, activeBtn } from "../redux/catalogueSlice";
import { getServiceDocs } from "../redux/documentSlice";

const Accordion = ({ setAll }) => {
  const { loading, allCatalogue, activeService } = useSelector(
    (store) => store.catalogue
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCatalogue());
  }, []);

  const handleService = (name) => {
    dispatch(getServiceDocs(name));
    dispatch(activeBtn({ name }));
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <h5 className="text-dark text-bold">Services</h5>
        </button>

        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              {allCatalogue &&
                allCatalogue
                  .filter((item) => item.catalogueType === "Services")
                  .map((service) => (
                    <tr
                      key={service._id}
                      className={
                        activeService === service.serviceName ? "active" : null
                      }
                    >
                      <th>
                        <button
                          className="btn"
                          onClick={() => handleService(service.serviceName)}
                        >
                          <b>{service.serviceName}</b>
                        </button>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="accordion-item">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          <h5 className="text-dark text-bold">Products</h5>
        </button>

        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              <tr>
                <th>Trapper Machine</th>
              </tr>
              <tr>
                <th>Snapper</th>
              </tr>
              <tr>
                <th>Samarth Incense Sticks</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="accordion-item">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          <h5 className="text-dark text-bold">Companies</h5>
        </button>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              {allCatalogue &&
                allCatalogue
                  .filter((item) => item.catalogueType === "Companies")
                  .map((service) => (
                    <tr key={service._id}>
                      <th>
                        <button className="btn">
                          <b>{service.serviceName}</b>
                        </button>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
