import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <div className="text-xl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/detail/:pid" element={<Detail />}></Route>
          <Route path="/thankyou" element={<ThankYou />}></Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-left" autoClose={3000} />
    </div>
  );
}

export default App;
