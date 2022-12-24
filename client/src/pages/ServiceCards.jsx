import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServiceCards } from "../redux/otherSlice";

const ServiceCards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceCards(""));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-3">Service Card Downloader</h1>
    </div>
  );
};
export default ServiceCards;
