import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow } from ".";
import { handleChange, removeFile, sendMail } from "../redux/documentSlice";

const Attach = () => {
  const { filesCart, emailTo } = useSelector((store) => store.doc);
  const [collapseButton, setCollapseButton] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(filesCart).length === 0) {
      return toast.error("Please attach files.")
    }
    dispatch(sendMail({ emailTo, filesCart }));
    setCollapseButton("collapse");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-center">
          <div className="col-5">
            <InputRow
              label="Email To -"
              type="email"
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
          <div className="col-7">
            <span id="passwordHelpInline" className="form-text">
              Multiple email ids must be comma separated
            </span>
          </div>
          <div className="col-auto">
            <h5>Attached Files -</h5>
          </div>
          <div className="col-10">
            {Object.entries(filesCart).map((item) => (
              <div key={item} className="badge bg-success position-relative">
                {item[0]}
                <button
                  onClick={() => dispatch(removeFile({ name: item[0] }))}
                  className="btn position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                ></button>
              </div>
            ))}
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
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Attach;
