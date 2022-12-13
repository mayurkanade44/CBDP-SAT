import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCatalogue, activeBtn } from "../redux/adminSlice";
import { getServiceDocs } from "../redux/documentSlice";

const Accordion = () => {
  const { loading, allCatalogue, activeService } = useSelector(
    (store) => store.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCatalogue());
  }, []);

  const handleService = (name, catalogue) => {
    dispatch(getServiceDocs(name));
    dispatch(activeBtn({ name, catalogue }));
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
                  .filter(
                    (item) =>
                      item.catalogueType === "Services" && item.serviceName
                  )
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .map((service) => (
                    <tr
                      key={service._id}
                      className={`filter-button
                        ${
                          activeService === service.serviceName
                            ? "active"
                            : null
                        }`}
                    >
                      <th>
                        <button
                          className="btn"
                          onClick={() =>
                            handleService(service.serviceName, "Services")
                          }
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
              {allCatalogue &&
                allCatalogue
                  .filter(
                    (item) =>
                      item.catalogueType === "Products" && item.serviceName
                  )
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .map((service) => (
                    <tr
                      key={service._id}
                      className={`filter-button
                        ${
                          activeService === service.serviceName
                            ? "active"
                            : null
                        }`}
                    >
                      <th>
                        <button
                          className="btn"
                          onClick={() =>
                            handleService(service.serviceName, "Services")
                          }
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
                  .filter(
                    (item) =>
                      item.catalogueType === "Companies" && item.serviceName
                  )
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .map((service) => (
                    <tr
                      key={service._id}
                      className={`filter-button
                        ${
                          activeService === service.serviceName
                            ? "active"
                            : null
                        }`}
                    >
                      <th>
                        <button
                          className="btn"
                          onClick={() =>
                            handleService(service.serviceName, "Companies")
                          }
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
          data-bs-target="#collapseFour"
          aria-expanded="false"
          aria-controls="collapseFour"
        >
          <h5 className="text-dark text-bold">STQ</h5>
        </button>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              {allCatalogue &&
                allCatalogue
                  .filter((item) => item.catalogueType === "STQ")
                  .map((service) => (
                    <tr
                      key={service._id}
                      className={`filter-button
                        ${
                          activeService === service.serviceName
                            ? "active"
                            : null
                        }`}
                    >
                      <th>
                        <button
                          className="btn"
                          onClick={() =>
                            handleService(service.serviceName, "Companies")
                          }
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
    </div>
  );
};
export default Accordion;
