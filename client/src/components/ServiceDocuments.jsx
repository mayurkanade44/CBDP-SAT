import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDocs } from "../redux/documentSlice";

const ServiceDocuments = () => {
  const { allDocs } = useSelector((store) => store.doc);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDocs());
  }, []);

  return (
    <div className="row gy-3">
      {allDocs?.map((item) => {
        return (
          <div className="col-4" key={item._id}>
            <Card {...item} />
          </div>
        );
      })}
    </div>
  );
};
export default ServiceDocuments;
