import "./App.css";
import NavBar from "./components/NavBar";
import ProductTable from "./components/ProductTable";
import InventorySummary from "./components/InventorySummary";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import AllTables from "./components/AllTables";

function App() {
  // eslint-disable-next-line
  const host = "http://127.0.0.1:5000";
  const [mainTable, setMainTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Search Product
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedTable = mainTable.filter((product) => {
    return product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  // Fetch All Products

  const getAllProducts = async () => {
    const url = `${host}/product/fetchall/`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setMainTable(json.results);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Add a Product

  const addProduct = async (
    product_name,
    product_desc,
    price,
    units,
    lower_limit_stock
  ) => {
    // POST API Call
    const url = `${host}/product/new/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        product_name,
        product_desc,
        price,
        units,
        lower_limit_stock,
      }),
    });
    const json = await response.json();
    console.log(json);
    setMainTable(mainTable.concat(json));
  };

  // Delete a Product

  const deleteProduct = async (pk) => {
    // API Call
    const url = `${host}/product/delete/${pk}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);

    const newTable = mainTable.filter((product) => {
      return product.pk !== pk;
    });
    setMainTable(newTable);
  };

  // Update a Product

  const updateProduct = async (
    pk,
    product_name,
    product_desc,
    price,
    units,
    lower_limit_stock
  ) => {
    // API Call
    const url = `${host}/product/update/${pk}/`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name,
        product_desc,
        price: parseInt(price),
        units: parseInt(units),
        lower_limit_stock: parseInt(lower_limit_stock),
      }),
    });
    const json = await response.json();
    console.log(json);

    let newTable = JSON.parse(JSON.stringify(mainTable));

    for (let index = 0; index < newTable.length; index++) {
      const element = newTable[index];
      if (element.pk === pk) {
        newTable[index].product_name = product_name;
        newTable[index].product_desc = product_desc;
        newTable[index].price = price;
        newTable[index].units = units;
        newTable[index].lower_limit_stock = lower_limit_stock;
        newTable[index].price = parseInt(newTable[index].price);
        newTable[index].units = parseInt(newTable[index].units);
        newTable[index].lower_limit_stock = parseInt(
          newTable[index].lower_limit_stock
        );
        break;
      }
    }
    console.log("newTable:", newTable);
    setMainTable(newTable);
  };

  // Getting Products with lower stock limit
  const getLowStockItems = (table) => {
    const lowStockItems = [];
    table.forEach((item) => {
      if (item.units < item.lower_limit_stock) {
        lowStockItems.push(item);
      }
    });
    return lowStockItems;
  };

  // Getting Inventory Summary
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

  return (
    <>
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} />

      <AllTables
        searchedTable={searchedTable}
        setMainTable={setMainTable}
        updateProduct={updateProduct}
        getLowStockItems={getLowStockItems(mainTable)}
      />

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
