import React from "react";

const NavBar = () => {
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
                <i className="fa-solid fa-circle-plus fa-flip mx-1 fa-xl"></i>{" "}
                New Product
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Product"
              aria-label="Search"
            />
            <button className="btn btn-outline-info" type="submit">
              <i className="fa-solid fa-magnifying-glass fa-shake"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
