import React from "react";
import { useState, useRef } from "react";
import ProductTable from "./ProductTable";
const AllTables = ({
  searchedTable,
  setMainTable,
  updateProduct,
  deleteProduct,
  getLowStockItems,
}) => {
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

  const editProduct = (currentProduct) => {
    ref.current.click();
    setProduct({
      pk: currentProduct.pk,
      eproduct_name: currentProduct.product_name,
      eproduct_desc: currentProduct.product_desc,
      eprice: currentProduct.price,
      eunits: currentProduct.units,
      elower_limit_stock: currentProduct.lower_limit_stock,
    });
  };

  const handleClick = (e) => {
    console.log("updating product...", product);
    updateProduct(
      product.pk,
      product.eproduct_name,
      product.eproduct_desc,
      product.eprice,
      product.eunits,
      product.elower_limit_stock
    );
    refClose.current.click();
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
        data-bs-target="#updateModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
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
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {searchedTable.length > 0 ? (
        <>
          <h2 className="display-5 text-center my-4">Products Table</h2>
          <ProductTable
            tableData={searchedTable}
            setTableData={setMainTable}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        </>
      ) : (
        <h2 className="lead text-center my-4">
          <em>No Products to Display.</em>
        </h2>
      )}

      {getLowStockItems.length > 0 ? (
        <>
          <h2 className="display-6 text-center my-4">
            Products with Lower Stock Limit
          </h2>
          <ProductTable
            tableData={getLowStockItems}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AllTables;
