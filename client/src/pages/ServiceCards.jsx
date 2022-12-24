import { useSelector, useDispatch } from "react-redux";
import { getServiceCards, handleOtherChange } from "../redux/otherSlice";

const ServiceCards = () => {
  const dispatch = useDispatch();
  const { contract, serviceCards } = useSelector((store) => store.other);

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
      <h2 className="text-center my-3">Service Card Downloader</h2>
      <form onSubmit={handleSearch } >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Contract Number"
            name="contract"
            value={contract}
            onChange={handleInput}
          />
          <button
            className="input-group-text btn btn-primary"
            id="basic-addon2"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
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
  );
};
export default ServiceCards;
