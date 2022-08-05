import React from "react";

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
              <h6 className="card-subtitle mb-2 text-muted">{totalProducts}</h6>
              <p className="card-text">Total Units: {totalUnits}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Total Investment</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                ₹{totalInvestment}
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow m-2" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Stock Readiness</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {stockReadiness.toFixed(2)}%
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;
