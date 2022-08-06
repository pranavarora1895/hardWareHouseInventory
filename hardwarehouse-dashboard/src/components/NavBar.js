import React from "react";
import { useRef, useState } from "react";
const NavBar = ({ onSearch, searchTerm, addProduct }) => {
  const ref = useRef(null);
  const refClose = useRef(null);
  const [product, setProduct] = useState({
    pk: "",
    eproduct_name: "",
    eproduct_desc: "",
    eprice: "",
    eunits: "",
    elower_limit_stock: "",
  });

  const newProduct = () => {
    ref.current.click();
  };

  const handleClick = (e) => {
    console.log("adding product...", product);
    addProduct(
      product.eproduct_name,
      product.eproduct_desc,
      product.eprice,
      product.eunits,
      product.elower_limit_stock
    );
    refClose.current.click();
    setProduct({
      pk: "",
      eproduct_name: "",
      eproduct_desc: "",
      eprice: "",
      eunits: "",
      elower_limit_stock: "",
    });
  };

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="eproduct_name" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eproduct_name"
                    name="eproduct_name"
                    value={product.eproduct_name}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eproduct_desc" className="form-label">
                    Product Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eproduct_desc"
                    name="eproduct_desc"
                    value={product.eproduct_desc}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eprice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="eprice"
                    name="eprice"
                    value={product.eprice}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eunits" className="form-label">
                    Units
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="eunits"
                    name="eunits"
                    value={product.eunits}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="elower_limit_stock" className="form-label">
                    Lower Stock Limit
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="elower_limit_stock"
                    name="elower_limit_stock"
                    value={product.elower_limit_stock}
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  product.eproduct_name.length < 3 ||
                  product.eproduct_desc.length < 3
                }
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
                onChange={onChange}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
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
                <button
                  className="btn btn-info text-white"
                  role="button"
                  onClick={() => {
                    newProduct();
                  }}
                >
                  <i className="fa-solid fa-circle-plus mx-1 fa-xl"></i>
                  Add Product
                </button>{" "}
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
              <label
                className="btn btn-outline-info shadow-sm"
                htmlFor="search"
              >
                <i className="fa-solid fa-magnifying-glass fa-shake"></i>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
