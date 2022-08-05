import React from "react";

const NavBar = ({ onSearch, searchTerm }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          hardWareHouse Inventory
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                <i className="fa-solid fa-circle-plus mx-1 fa-xl text-info"></i>{" "}
                New Product
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <input
              className="form-control me-2"
              id="search"
              type="text"
              onChange={onSearch}
              value={searchTerm}
              placeholder="Search Product"
              aria-label="Search"
            />
            <label className="btn btn-outline-info" htmlFor="search">
              <i className="fa-solid fa-magnifying-glass fa-shake"></i>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
