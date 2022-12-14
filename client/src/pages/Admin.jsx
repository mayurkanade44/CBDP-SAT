import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputRow, InputSelect, Multiselect } from "../components";
import { addCatalogue, handleAdminChange, setShow } from "../redux/adminSlice";
import { addDoc, editDoc, handleChange } from "../redux/documentSlice";
import { adminController } from "../utilis/data";

const Admin = () => {
  const {
    serviceName,
    allCatalogue,
    catalogueType,
    fileType,
    fileName,
    videoUrl,
    show,
    editDocId,
    isEditing,
    file,
  } = useSelector((store) => store.admin);
  const [services, setServices] = useState([]);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState("");
  const [doc, setDoc] = useState("");
  const dispatch = useDispatch();

  let catalogues = [];

  const handleOnchange = (val) => {
    setValue(val);
  };

  const objs = services.map((x) => ({
    label: x.serviceName,
    value: x.serviceName,
  }));

  allCatalogue.map(
    (item) =>
      !catalogues.includes(item.catalogueType) &&
      catalogues.push(item.catalogueType)
  );

  useEffect(() => {
    const serv = allCatalogue.filter(
      (item) => item.catalogueType === catalogueType && item.serviceName
    );
    const file = allCatalogue
      .filter((item) => item.catalogueType === catalogueType && item.fileType)
      .map((item) => item.fileType);

    setServices(serv);
    setFiles(file);
  }, [catalogueType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (show === "Add Document") {
      const myForm = new FormData();

      myForm.set("typeOfCatalogue", catalogueType);
      myForm.set("typeOfFile", fileType);
      myForm.set("typeOfService", value);
      myForm.set("name", fileName);

      if (isEditing) {
        myForm.append("file", doc ? doc : file);
        dispatch(editDoc({ editDocId, myForm }));
      } else {
        myForm.append("file", fileType === "Videos" ? file : doc);
        dispatch(addDoc(myForm));
      }

      return;
    } else if (show === "Add Service Type") {
      dispatch(addCatalogue({ catalogueType, serviceName }));
      return;
    } else if (show === "Add File Type") {
      dispatch(addCatalogue({ catalogueType, fileType }));
      return;
    }
  };

  return (
    <div className="container-fluid ps-4">
      <h3 className="text-center mb-3 text-success">Admin Dashboard</h3>
      <div className="row">
        <div className="col-2">
          <table className="table border border-3 ">
            <tbody className="text-center">
              {adminController.map((item) => {
                return (
                  <tr
                    className={`filter-button ${
                      show === item.name ? "active" : null
                    }`}
                    key={item.id}
                  >
                    <th>
                      <button
                        onClick={() => dispatch(setShow(item.name))}
                        className={`btn `}
                      >
                        <b>{item.name}</b>
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-10">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-4 mb-3">
              <InputSelect
                label="Catalogue"
                name="catalogueType"
                value={catalogueType}
                data={["Select", ...catalogues]}
                handleChange={(e) =>
                  dispatch(
                    handleAdminChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            {(show === "Add Service Type" || show === "Add File Type") && (
              <div className="col-4 mb-3">
                <InputRow
                  label={
                    show === "Add Service Type" ? "Service Name" : "File Name"
                  }
                  name={
                    show === "Add Service Type" ? "serviceName" : "fileType"
                  }
                  value={show === "Add Service Type" ? serviceName : fileType}
                  handleChange={(e) =>
                    dispatch(
                      handleAdminChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
            )}
            {show === "Add Document" && (
              <>
                <div className="col-4 mb-3">
                  <div className="row mt-2">
                    <div className="col-lg-3">
                      <h4 className="d-inline">Service</h4>
                    </div>
                    <div className="col-lg-5">
                      <Multiselect
                        handleChange={handleOnchange}
                        option={objs}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 mb-3">
                  <InputSelect
                    label="File Type:"
                    name="fileType"
                    value={fileType}
                    data={["Select", ...files]}
                    handleChange={(e) =>
                      dispatch(
                        handleAdminChange({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col-4">
                  <InputRow
                    label="File Name"
                    name="fileName"
                    value={fileName}
                    handleChange={(e) =>
                      dispatch(
                        handleAdminChange({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col-4 mt-3">
                  {fileType === "Videos" ? (
                    <InputRow
                      label="Video URL"
                      name="file"
                      value={file}
                      handleChange={(e) =>
                        dispatch(
                          handleAdminChange({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => setDoc(e.target.files[0])}
                      required={isEditing ? false : true}
                    />
                  )}
                </div>
              </>
            )}
            <div className="col-auto">
              <button className="btn btn-primary mt-1" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Admin;
