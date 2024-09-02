
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/products";
import AddProduct from "./pages/AddProduct";
import View from "./pages/View";
import Edit from "./pages/Edit";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-2 sidebar">
          <SideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/view/:productId" element={<View />} />
            <Route path="/products/edit/:productId" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
