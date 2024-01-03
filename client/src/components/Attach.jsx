import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow } from ".";
import { handleChange, removeFile, sendMail } from "../redux/documentSlice";

const Attach = () => {
  const { docLoading, filesCart, emailTo } = useSelector((store) => store.doc);
  const { user } = useSelector((store) => store.user);
  const [collapseButton, setCollapseButton] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filesCart.length < 1) {
      return toast.error("Please attach files.");
    }

    const form = new FormData();
    form.set("userName", user.name);
    form.set("emailTo", emailTo);
    console.log(filesCart);
    filesCart.map((item) => form.append("filesCart", JSON.stringify(item)));
    if (files.length > 0) {
      files.map((item) => form.append("attachment", item));
    }

    dispatch(sendMail(form));
    setTimeout(() => {
      setCollapseButton("collapse");
      setCollapseButton("collapse");
    }, 3000);
  };

  return (
    <div className="container">
      <div className="row g-3 align-items-center">
        <div className="col-auto ms-1">
          <h5>Attached Files -</h5>
        </div>
        <div className="col-9">
          {filesCart.map((item, index) => (
            <div key={index} className="badge bg-success position-relative">
              {item.name}
              <button
                onClick={() => dispatch(removeFile({ name: item.name }))}
                className="btn position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
              ></button>
            </div>
          ))}
        </div>
        <form className="row mt-2" onSubmit={handleSubmit}>
          <div className="col-12 my-3">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
          </div>
          <div className="col-6">
            <InputRow
              label="Email To -"
              type="text"
              placeholder="abc@xyz.com"
              name="emailTo"
              value={emailTo}
              handleChange={(e) =>
                dispatch(
                  handleChange({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>
          <div className="col-4 pt-2">
            <span id="passwordHelpInline" className="form-text">
              Multiple email ids must be comma separated
            </span>
          </div>
          <div className="col-1">
            <button
              className="btn btn-primary"
              data-bs-toggle={collapseButton}
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              disabled={!emailTo && true}
            >
              {docLoading ? "Sending...." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Attach;
