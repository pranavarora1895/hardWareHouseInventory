import React from "react";

const ProductTable = ({ tableData, editProduct, deleteProduct }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-hover container shadow-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Product</th>
            <th scope="col">Description</th>
            <th scope="col">Units</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Total Price</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((product, index) => {
            return (
              <tr key={product.pk}>
                <th scope="row">{index + 1}</th>
                <td>{product.pk}</td>
                <td>{product.product_name}</td>
                <td>{product.product_desc}</td>
                <td>{product.units}</td>
                <td>₹{product.price}</td>
                <td>₹{product.units * product.price}</td>
                <td className="text-center">
                  <i
                    className="fa-solid fa-file-pen text-primary"
                    role="button"
                    onClick={() => {
                      editProduct(product);
                    }}
                  ></i>
                </td>
                <td className="text-center">
                  <i
                    className="fa-solid fa-trash-can text-danger"
                    role="button"
                    onClick={() => {
                      deleteProduct(product.pk);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
