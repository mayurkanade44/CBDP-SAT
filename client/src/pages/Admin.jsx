import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputRow, InputSelect, Multiselect } from "../components";
import {
  addCatalogue,
  getAllCatalogue,
  handleAdminChange,
  setShow,
} from "../redux/adminSlice";
import { addDoc, editDoc } from "../redux/documentSlice";
import {
  getAllUsers,
  handleUserChange,
  userDelete,
  userRegister,
} from "../redux/userSlice";
import { adminController } from "../utilis/data";

const Admin = () => {
  const {
    serviceName,
    allCatalogue,
    catalogueType,
    fileType,
    fileName,
    show,
    editDocId,
    isEditing,
    file,
    description,
  } = useSelector((store) => store.admin);

  const { allUsers, name, password, role, email } = useSelector(
    (store) => store.user
  );

  const [register, setRegister] = useState(false);
  const [services, setServices] = useState([]);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState("");
  const [doc, setDoc] = useState("");
  const [code, setCode] = useState("");
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

    // eslint-disable-next-line
  }, [catalogueType]);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCatalogue());

    // eslint-disable-next-line
  }, []);

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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (role !== "Stakeholder")
      return dispatch(userRegister({ name, email, password, role }));
    if (code === "epcorn@2022") {
      return dispatch(userRegister({ name, email, password, role }));
    }
    toast.error("Please enter valid code");
  };

  const showForm = (id) => {
    dispatch(setShow(id));
    setRegister(false);
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
                        onClick={() => showForm(item.name)}
                        className="btn"
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
          {show === "All Users" && !register && (
            <>
              <button
                onClick={() => setRegister(!register)}
                className="btn btn-success"
              >
                {register ? "Back" : "Register User"}
              </button>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.role !== "Admin" && (
                          <button
                            className="btn btn-danger"
                            onClick={() => dispatch(userDelete(user._id))}
                          >
                            Remove User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {register && (
            <form className="row" onSubmit={handleRegisterSubmit}>
              <div className="col-5">
                <InputRow
                  label="Name"
                  name="name"
                  value={name}
                  handleChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="col-3 mb-3">
                <InputSelect
                  label="Role:"
                  name="role"
                  value={role}
                  data={["Select", "User", "Admin", "Stakeholder"]}
                  handleChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="col-3">
                {role === "Stakeholder" && (
                  <InputRow
                    label="Code"
                    type="text"
                    name="code"
                    value={code}
                    handleChange={(e) => setCode(e.target.value)}
                  />
                )}
              </div>
              <div className="col-4">
                <InputRow
                  label="User Email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="abc@xyz.com"
                  handleChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="col-4">
                <InputRow
                  label="Password"
                  name="password"
                  value={password}
                  handleChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="col-auto mt-1">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          )}

          <form className="row" onSubmit={handleSubmit}>
            {(show === "Add Document" ||
              show === "Add Service Type" ||
              show === "Add File Type") && (
              <div className="col-4 mb-3">
                <InputSelect
                  label="Heading"
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
            )}
            {(show === "Add Service Type" || show === "Add File Type") && (
              <div className="col-4 mb-3">
                <InputRow
                  label={
                    show === "Add Service Type"
                      ? `${catalogueType} Name`
                      : "File Name"
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
                    <div className="col-lg-4">
                      <h4 className="d-inline">{catalogueType || "Name"}</h4>
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
                {catalogueType === "STQ" && (
                  <div className="col-4">
                    <InputRow
                      label="Description"
                      name="description"
                      value={description}
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
            {show !== "All Users" && (
              <div className="col-auto">
                <button className="btn btn-primary mt-1" type="submit">
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Admin;
