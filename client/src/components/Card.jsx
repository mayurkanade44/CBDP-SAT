import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileViewer from "react-file-viewer";
import { attachFile, deleteDoc } from "../redux/documentSlice";
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

  const { user } = useSelector((store) => store.user);

  const handleView = (file) => {
    const fileType = file.split(".").pop();
    setType(fileType);
    setView(!view);
  };

  return (
    <motion.div layout className="card">
      <h4 className="text-center mt-2">{typeOfFile}</h4>
      <div className="card-body pt-1">
        <h6 className="card-title" style={{ color: "red" }}>
          {name}
        </h6>
        <p className="card-text">
          <b>Services - </b> {typeOfService.join(", ")}
        </p>
        {typeOfFile === "Videos" ? (
          <a href={file} target="_blank" rel="noreferrer">
            <button className="btn btn-primary m-1">Preview</button>
          </a>
        ) : (
          <button
            className="btn btn-primary m-1"
            onClick={() => handleView(file)}
          >
            Preview
          </button>
        )}
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
            rel="noreferrer"
          >
            Download
          </a>
        </button>
        <button
          className="btn btn-dark m-1"
          onClick={() => dispatch(attachFile({ file, name, typeOfFile }))}
        >
          Attach
        </button>
        {user.role === "Admin" && (
          <>
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
            <button
              className="btn btn-danger m-1"
              onClick={() => dispatch(deleteDoc(_id))}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
export default Card;
