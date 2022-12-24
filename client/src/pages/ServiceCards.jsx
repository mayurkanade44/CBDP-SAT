import { useSelector, useDispatch } from "react-redux";
import { Loading, SearchContainer, Table } from "../components";
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
      <h2 className="text-center text-info mt-3 mb-5">
        Service Card Downloader
      </h2>
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
          <Table
            user={false}
            th1="Contract Number"
            th2="Service Name"
            th3="Download"
            data={serviceCards}
            download={download}
          />
        </div>
      </div>
    </div>
  );
};
export default ServiceCards;
