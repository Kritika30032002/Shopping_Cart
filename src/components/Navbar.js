import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Create from "./Create";
import { Tooltip } from "antd";
import { fetchProducts, filteredProducts } from "../store/productSlice";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiFillHome,
} from "react-icons/ai";
import { ImCross } from "react-icons/im";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit", e.target.value);
    // await setTerm(e.target.value);

    if (term === "") {
      await dispatch(fetchProducts());
    } else {
      await dispatch(filteredProducts(term));
    }
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { products } = useSelector((state) => state.cart);
  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-3 bg-neutral-200 fixed top-0 w-full z-30 `}
    >
      <div className="flex items-center flex-shrink-0 mr-6 lg:mr-96">
        <Tooltip title="Welcome to Store">
          <span>PRODUCT STORE</span>
        </Tooltip>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex items-center justify-center lg:flex-grow lg:right-0 lg:flex lg:justify-end">
          <form
            onSubmit={handleSubmit}
            className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-6"
          >
            <div className="relative bg-white flex flex-row w-56 py-1 rounded focus:outline-0">
              <div className="">
                {!term ? (
                  <button
                    type="submit" // Change this to type="submit" to trigger form submission
                    className="absolute lg:top-1/2 transform lg:-translate-y-1/2 lg:p-2 right-3 text-gray-500"
                  >
                    <AiOutlineSearch size={25} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(fetchProducts());
                      setTerm("");
                    }}
                    className="absolute lg:top-1/2 transform lg:-translate-y-1/2 lg:p-2 right-3 text-gray-500"
                  >
                    <ImCross size={15} />
                  </button>
                )}
              </div>

              <input
                className="w-48 pl-3 focus:outline-0 "
                type="text"
                placeholder="Search..."
                value={term}
                onFocus={() => {
                  navigate("/");
                }}
                onChange={(e) => {
                  setTerm(e.target.value);

                  dispatch(filteredProducts(e.target.value));
                }}
                name="search"
              />
            </div>
          </form>
          <div className="block items-center mt-4 lg:mr-6 lg:inline-block lg:mt-0 text-white-200">
            <Tooltip title="Home">
              <Link className="" to="/">
                <AiFillHome size={30} />
              </Link>
            </Tooltip>
          </div>
          <div className="block mt-4 lg:mr-6 lg:inline-block lg:mt-0 text-white-200">
            <Tooltip title="Cart">
              <Link className=" relative" to="/cart">
                <AiOutlineShoppingCart size={30} />
                <span className="absolute rounded-full bg-red-600 w-4 h-4 -top-1 lg:-right-2 left-5 p-0 m-0 text-white font-mono text-xs lg:leading-tight text-center">
                  {products ? products.length : 0}
                </span>
              </Link>
            </Tooltip>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-white-200">
            <Create />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
