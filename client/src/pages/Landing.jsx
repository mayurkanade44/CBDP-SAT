import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import new1 from "../images/new.png";
import { latestDocs } from "../redux/documentSlice";

const Landing = () => {
  const { docLoading, newDocs } = useSelector((store) => store.doc);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(latestDocs());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-11">
            <table className="table mt-4">
              <thead>
                <tr>
                  {newDocs?.map((item) => {
                    return (
                      <th className="pt-3" key={item._id}>
                        <img src={new1} alt="new" width={40} className="me-1" />
                        {item.name} has been added
                      </th>
                    );
                  })}
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
