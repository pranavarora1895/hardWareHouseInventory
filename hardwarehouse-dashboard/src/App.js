import "./App.css";
import NavBar from "./components/NavBar";
import ProductTable from "./components/ProductTable";
import InventorySummary from "./components/InventorySummary";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // eslint-disable-next-line
  const [mainTable, setMainTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedTable = mainTable.filter((product) => {
    return product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const getProducts = async () => {
    const getData = await axios.get("http://127.0.0.1:5000/product/fetchall/");
    console.log(getData.data);
    setMainTable(getData.data.results);
  };

  const getLowStockItems = (table) => {
    const lowStockItems = [];
    table.forEach((item) => {
      if (item.units < item.lower_limit_stock) {
        lowStockItems.push(item);
      }
    });
    return lowStockItems;
  };

  const getInventorySummary = (table) => {
    let total = 0;
    let investment = 0;
    table.forEach((item) => {
      total += item.units;
      investment += item.units * item.price;
    });
    const getLowStockLength = getLowStockItems(table).length;
    const tableLength = table.length;
    const stockReadiness =
      ((tableLength - getLowStockLength) / tableLength) * 100;

    return { total, investment, stockReadiness };
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} />
      <h2 className="display-5 text-center my-4">Products Table</h2>
      <ProductTable tableData={searchedTable} setTableData={setMainTable} />
      <h2 className="display-6 text-center my-4">
        Products with Lower Stock Limit
      </h2>
      <ProductTable tableData={getLowStockItems(mainTable)} />
      <InventorySummary
        totalProducts={mainTable.length}
        totalUnits={getInventorySummary(mainTable).total}
        totalInvestment={getInventorySummary(mainTable).investment}
        stockReadiness={getInventorySummary(mainTable).stockReadiness}
      />
      <Footer />
    </>
  );
}

export default App;
