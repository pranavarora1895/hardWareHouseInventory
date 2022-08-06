import React from "react";
import productsImage from "../img/products.png";
import investmentImage from "../img/investments.png";
import stockAvailable from "../img/stockAvailable.png";
const InventorySummary = ({
  totalProducts,
  totalUnits,
  totalInvestment,
  stockReadiness,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      <div className="row container my-2">
        <div className="col">
          <div className="card shadow m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <h6 className="card-subtitle mb-2 text-muted display-3">
                {totalProducts}
              </h6>
              <img src={productsImage} alt="" height={100} width={200} />
              <p className="card-text lead">Total Qty: {totalUnits}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Inventory Cost</h5>
              <img src={investmentImage} alt="" height={150} width={250} />
              <h6 className="card-subtitle mb-2 text-muted display-6">
                ₹{totalInvestment}
              </h6>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Stock Control</h5>
              <img src={stockAvailable} alt="" height={150} width={250} />
              <h6 className="card-subtitle mb-2 text-muted display-6">
                {stockReadiness.toFixed(2)}%
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
