import React from "react";
import { useSelector } from "react-redux";
// import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  //   var time = today.getHours() + ":" + today.getMinutes();
  const random = parseInt("39" + Math.floor(100 + Math.random() * 900));
  //   console.log();
  return (
    <div className="h-screen flex items-center justify-center flex-col m-10">
      <div className="font-bold text-5xl mb-3">Thank you for your order</div>
      <div className="text-center text-sm">
        Your order has been placed and is being processed. You will receive an
        email with the order details.
      </div>
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between w-2/3 m-10 mt-5">
        <div className="flex flex-row">
          <div className="font-bold w-24 lg:w-auto">Order Id: </div>
          <div className="w-24">{random}</div>
        </div>
        <div className="flex flex-row">
          <div className="font-bold w-24 lg:w-auto">Date: </div>
          <div className="w-24">{date}</div>
        </div>
        <div className="flex flex-row">
          <div className="font-bold w-24 lg:w-auto"> Total: </div>
          <div className="w-24">₹{totalPrice}</div>
        </div>
      </div>
      <div className="bg-neutral-200 font-bold w-40 text-sm p-2 flex items-center justify-center">
        <button onClick={() => navigate("/")}>Back to Products</button>
      </div>
    </div>
  );
};

export default ThankYou;
