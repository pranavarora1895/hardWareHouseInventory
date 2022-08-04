import "./App.css";
import NavBar from "./components/NavBar";
import ProductTable from "./components/ProductTable";
import InventorySummary from "./components/InventorySummary";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <h2 className="display-5 text-center my-4">Products Table</h2>
      <ProductTable />
      <h2 className="display-6 text-center my-4">
        Products with Lower Stock Limit
      </h2>
      <ProductTable />
      <InventorySummary />
      <Footer />
    </>
  );
}

export default App;
