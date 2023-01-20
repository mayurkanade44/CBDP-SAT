import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center page-top">
      <h2>404, Page Not Found!!</h2>
      <Link to="/documents" className="btn btn-primary ms-2">
        Back To Home
      </Link>
    </div>
  );
};
export default PageNotFound;
