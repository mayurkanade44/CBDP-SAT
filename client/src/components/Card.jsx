
const Card = ({ typeOfFile, name, typeOfService }) => {
  return (
    <div className="card">
      <h3 className="text-center mt-2">{typeOfFile}</h3>
      <div className="card-body">
        <h5 className="card-title" style={{ color: "red" }}>
          {name}
        </h5>
        <p className="card-text">
          <b>Services - </b> {typeOfService}
        </p>
        <button className="btn btn-primary m-1">Preview</button>
        <button className="btn btn-success m-1">Download</button>
        <button className="btn btn-dark m-1">Attach</button>
      </div>
    </div>
  );
};
export default Card;
