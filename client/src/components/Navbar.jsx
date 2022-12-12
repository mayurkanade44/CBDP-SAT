import { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../images/menu.png";
import bag from "../images/bag.png";
import colorBag from "../images/colorbag.png";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { filesCart } = useSelector((store) => store.doc);

  return (
    <header>
      <nav className="navbar navbar-expand-lg mb-2">
        <div className="container-fluid">
          <div className="mobile-nav">
            <div className="nav-item">
              <Link
                to="/"
                className="nav-link text-center"
                aria-current="page"
                onClick={() => {
                  setExpand(false);
                }}
              >
                <h2>CBDP</h2>
                <p style={{ marginBottom: 0, fontWeight: 400, fontSize: 12 }}>
                  Cloud Based Document Portal
                </p>
              </Link>
            </div>
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
          </div>
          <div
            className={`navbar-collapse ${!expand ? "collapse" : ""}`}
            id="navbarNav"
          >
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
                  to="/"
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
                  to="/"
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
            <ul></ul>
            <ul className="navbar-nav ms-auto prof">
              <li className="nav-link " style={{ margin: 0 }}>
                <Link to="/attach" className=" position-relative">
                  <img
                    src={Object.keys(filesCart).length > 0 ? colorBag : bag}
                    alt="cart"
                    style={{ width: 32 }}
                  />
                  {Object.keys(filesCart).length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge cart-badge rounded-pill bg-dark">
                      {Object.keys(filesCart).length}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ marginLeft: 0, marginTop: 2 }}
                >
                  <h5 className="d-inline">Mayur</h5>
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/admin" className="dropdown-item">
                      Admin
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <button className="dropdown-item">Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
