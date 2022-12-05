import msds from "../images/msds.png";
const Card = () => {
  return (
    <div className="card">
      <img
        src={msds}
        className="card-img-center"
        alt="..."
        style={{ width: 200 }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: "red" }}>
          PRIMISE SC 2020
        </h5>
        <p className="card-text">
          <b>Services - </b> Antron, Bedbugs
        </p>
        <button className="btn btn-primary m-1">Preview</button>
        <button className="btn btn-success m-1">Download</button>
        <button className="btn btn-dark m-1">Attach</button>
      </div>
    </div>
  );
};
export default Card;
