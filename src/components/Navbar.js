import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const nav = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    props.setUser({ user: null });
    localStorage.setItem("user", null);
    nav("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Money Book
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/track-expense">
                  Track Expenses
                </NavLink>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            {props.user != null ? (
              <div className="d-flex">
                
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {props.user.username}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>&nbsp;&nbsp;
                <img
                  src={props.user.picture}
                  alt={props.user.username}
                  height="50"
                  width="50"
                  className="mt-2"
                />
              </div>
            ) : (
              <NavLink className="nav-link" to="">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
