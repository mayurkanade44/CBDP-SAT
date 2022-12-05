const Accordion = () => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header test" id="headingOne">
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
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              <tr>
                <th>Green Shield</th>
              </tr>
              <tr>
                <th>Termiproof</th>
              </tr>
              <tr>
                <th>Bed Bugs</th>
              </tr>
              <tr>
                <th>Antron</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
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
        </h2>
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
        <h2 className="accordion-header" id="headingThree">
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
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <table className="table table-striped border border-3 ">
            <tbody className="text-center">
              <tr>
                <th>EPPL</th>
              </tr>
              <tr>
                <th>EPCORN</th>
              </tr>
              <tr>
                <th>SMARK</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
