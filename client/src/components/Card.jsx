import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FileViewer from "react-file-viewer";
import { attachFile } from "../redux/documentSlice";
import { Link } from "react-router-dom";
import { setEditDoc } from "../redux/adminSlice";

const Card = ({
  typeOfFile,
  typeOfCatalogue,
  name,
  typeOfService,
  file,
  _id,
}) => {
  const [view, setView] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const handleView = (file) => {
    const fileType = file.split(".").pop();
    setType(fileType);
    setView(!view);
  };

  return (
    <motion.div layout className="card">
      <h3 className="text-center mt-2">{typeOfFile}</h3>
      <div className="card-body">
        <h5 className="card-title" style={{ color: "red" }}>
          {name}
        </h5>
        <p className="card-text">
          <b>Services - </b> {typeOfService.join(", ")}
        </p>
        <button
          className="btn btn-primary m-1"
          onClick={() => handleView(file)}
        >
          Preview
        </button>
        {view && (
          <div className="modal">
            <div className="modal-content">
              <button className="btn btn-danger" onClick={() => setView(!view)}>
                Close
              </button>
              <FileViewer fileType={type} filePath={file} />
            </div>
          </div>
        )}
        <button className="btn btn-success m-1">
          <a
            style={{
              textDecoration: "none",
              color: "white",
            }}
            href={file}
          >
            Download
          </a>
        </button>
        <button
          className="btn btn-dark m-1"
          onClick={() => dispatch(attachFile({ file, name }))}
        >
          Attach
        </button>
        <Link
          to="/admin"
          className="btn btn-warning m-1"
          onClick={() =>
            dispatch(
              setEditDoc({
                fileName: name,
                fileType: typeOfFile,
                serviceName: typeOfService,
                catalogueType: typeOfCatalogue,
                file,
                editDocId: _id,
              })
            )
          }
        >
          Edit
        </Link>
      </div>
    </motion.div>
  );
};
export default Card;
