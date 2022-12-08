import { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../images/menu.png";
import bag from "../images/bag.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [expand, setExpand] = useState(false);
  const { cart } = useSelector((store) => store.doc);

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
            <ul>
              <img
                src={bag}
                className="mt-2"
                alt="cart"
                style={{ width: 35 }}
              />
              {cart.length > 0 && (
                <span className="total-amount">{cart.length}</span>
              )}
            </ul>
            <ul className="navbar-nav ms-auto prof">
              <h5>Mayur</h5>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
