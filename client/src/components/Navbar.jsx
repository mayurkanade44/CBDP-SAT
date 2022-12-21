import { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../images/menu.png";
import bag from "../images/bag.png";
import colorBag from "../images/colorbag.png";
import horse from "../images/horse.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { handleUserChange, userLogin, logout } from "../redux/userSlice";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { filesCart } = useSelector((store) => store.doc);
  const { user, email, password } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg mb-2">
        <div className="container-fluid">
          <ul className="navbar-nav mobile-nav my-1">
            <li className="nav-item">
              <img src={horse} alt="horse" width={55} />
            </li>
            <li
              className="nav-item text-center horse"
              aria-current="page"
              onClick={() => {
                setExpand(false);
              }}
            >
              <h2>CBDP</h2>
              <p style={{ marginBottom: 0, fontWeight: 400, fontSize: 12 }}>
                Cloud Based Document Portal
              </p>
            </li>

            <button
              className="navbar-toggler collapsed"
              aria-controls="navbarNav"
              aria-label="toggle navigation"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <img src={menu} alt="menu" style={{ width: 35 }} />
            </button>
          </ul>
          <div
            className={`navbar-collapse ${!expand ? "collapse" : ""}`}
            id="navbarNav"
          >
            {user && (
              <>
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <Link
                      to="/documents"
                      className="nav-link text-center"
                      aria-current="page"
                      onClick={() => {
                        setExpand(false);
                      }}
                    >
                      <h5>Documents</h5>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/serviceCards"
                      className="nav-link text-center"
                      aria-current="page"
                      onClick={() => {
                        setExpand(false);
                      }}
                    >
                      <h5>Service Cards</h5>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/upskill"
                      className="nav-link text-center"
                      aria-current="page"
                      onClick={() => {
                        setExpand(false);
                      }}
                    >
                      <h5>Upskill</h5>
                    </Link>
                  </li>
                </ul>
              </>
            )}
            {user ? (
              <ul className="navbar-nav ms-auto prof">
                <li className="nav-link cart" style={{ margin: 0 }}>
                  <button
                    className="btn position-relative"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    style={{ paddingTop: 0 }}
                  >
                    <img
                      src={filesCart.length > 0 ? colorBag : bag}
                      alt="cart"
                      style={{ width: 32 }}
                    />
                    {filesCart.length > 0 && (
                      <span className="position-absolute top-25 start-75 translate-middle badge cart-badge rounded-pill bg-dark">
                        {filesCart.length}
                      </span>
                    )}
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginLeft: 0, marginTop: 2 }}
                  >
                    <h5 className="d-inline">{user.name}</h5>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {user.role === "Admin" && (
                      <>
                        <li>
                          <Link to="/admin" className="dropdown-item">
                            Admin
                          </Link>
                        </li>
                        <hr />
                      </>
                    )}
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <form className="d-flex ms-auto" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="email"
                  placeholder="abc@xyz.com"
                  name="email"
                  value={email}
                  onChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  required
                />
                <input
                  className="form-control me-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) =>
                    dispatch(
                      handleUserChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  required
                />
                <button className="btn btn-outline-success" type="submit">
                  Login
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
