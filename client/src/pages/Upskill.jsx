import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContainer } from "../components";
import { getVideos, handleAdminChange } from "../redux/adminSlice";

const Upskill = () => {
  const { videos, fileName } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
  }, []);

  const handleInput = (e) => {
    dispatch(
      handleAdminChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getVideos(fileName));
  };

  return (
    <div className="container">
      <div className="row gx-5 gy-4">
        <div className="col-12 pt-4 d-flex justify-content-center ">
          <SearchContainer
            name="fileName"
            value={fileName}
            placeholder="Title"
            handleSearch={handleSearch}
            handleChange={handleInput}
          />
        </div>
        {videos?.length === 0 && (
          <h3 className="text-center">
            <b>No document found.</b>
          </h3>
        )}
        {videos?.map((video) => (
          <div className="col-md-4" key={video._id}>
            <div className="video-card">
              <iframe
                width="340"
                height="200"
                src={`https://www.youtube.com/embed/${video.file
                  .split("/")
                  .pop()}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <h5 className="text-center pb-3">{video.fileName}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Upskill;
