import { SearchContainer } from "../components";

const Upskill = () => {
  const link = "https://youtu.be/ZKaWTK91ECQ";
  console.log(link.split("/"));

  return (
    <div className="container">
      <div className="row gx-5 gy-4">
        <div className="col-12 pt-4 d-flex justify-content-center ">
          <SearchContainer />
        </div>
        <div className="col-md-4">
          <div className="video-card">
            <iframe
              width="340"
              height="200"
              className="text-center"
              src="https://www.youtube.com/embed/ZKaWTK91ECQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            <h5 className="text-center pb-3">Mayur</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="video-card">
            <iframe
              width="340"
              height="200"
              className="text-center"
              src="https://www.youtube.com/embed/ZKaWTK91ECQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            <h5 className="text-center pb-3">Mayur</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="video-card">
            <iframe
              width="340"
              height="200"
              className="text-center"
              src="https://www.youtube.com/embed/ZKaWTK91ECQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            <h5 className="text-center pb-3">Mayur</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Upskill;
