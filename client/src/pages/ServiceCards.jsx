import { useSelector, useDispatch } from "react-redux";
import { Loading, SearchContainer } from "../components";
import { getServiceCards, handleOtherChange } from "../redux/otherSlice";

const ServiceCards = () => {
  const dispatch = useDispatch();
  const { otherLoading, contract, serviceCards } = useSelector(
    (store) => store.other
  );

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleOtherChange({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getServiceCards(contract));
  };

  async function download(url, name) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = `${name}.jpeg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }

  return (
    <div className="container">
      {otherLoading && <Loading />}
      <h2 className="text-center my-3">Service Card Downloader</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-5">
          <SearchContainer
            name="contract"
            value={contract}
            placeholder="Contract Number"
            handleSearch={handleSearch}
            handleChange={handleInput}
          />
        </div>
        <div className="col-10">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Contract Number</th>
                <th>Service Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {serviceCards?.map((item) => (
                <tr key={item._id}>
                  <td>{item.contract}</td>
                  <td>{item.serviceName}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => download(item.image[0], item.contract)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ServiceCards;
