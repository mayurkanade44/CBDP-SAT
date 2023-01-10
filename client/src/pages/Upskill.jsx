import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, SearchContainer } from "../components";
import { deleteVideo, getVideos, handleAdminChange } from "../redux/adminSlice";

const Upskill = () => {
  const { videos, fileName, loading } = useSelector((store) => store.admin);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());

    // eslint-disable-next-line
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

  if (loading) return <Loading />;

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
            <b>No Video found.</b>
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
              <h5 className="text-center d-inline px-2 text-success">
                {video.fileName}
              </h5>
              {user.role === "Admin" && (
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => dispatch(deleteVideo(video._id))}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Upskill;
