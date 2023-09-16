import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  remove,
  getCartTotal,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from "../store/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
// import ThankYou from "./ThankYou";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <h3 className="text-center mb-4 text-6xl">
          Cart - {products.length} items
        </h3>
        <button className="flex bg-neutral-950 text-white text-center font-bold h-10 w-10 m-3 items-center justify-center">
          <Link to="/">
            <BsArrowLeft size={25} />
          </Link>
        </button>
        <section className="p-4">
          <div className="grid grid-cols-1">
            <div className="">
              {products?.map((data) => (
                <div className="ml-10 mr-10 mb-10 w-84 flex lg:flex lg:flex-row lg:justify-between flex-col">
                  <hr />
                  <Link
                    className="flex items-center justify-center lg:items-start"
                    to={`/detail/${data.id}`}
                  >
                    <img
                      src={data?.image[0]?.thumbUrl}
                      className="h-56 w-40 pt-5 pb-5 lg:mr-20"
                      alt="Blue Jeans Jacket"
                    />
                  </Link>

                  <div className="lg:h-56 p-4 lg:w-72 flex flex-col items-center justify-center lg:mr-12">
                    <strong className="w-56">{data.title}</strong>
                  </div>

                  <div className="lg:h-56 lg:w-56 flex items-center justify-center flex-col lg:mr-12">
                    <div className="mb-4 flex justify-between w-48 items-center justify-center ">
                      <div className="ml-5">
                        <button
                          className="bg-slate-200 rounded-full p-1 px-3 mt-2"
                          onClick={() => {
                            if (data.quantity === 1) {
                              dispatch(remove(data.id));

                              return;
                            }
                            dispatch(decreaseItemQuantity(data.id));
                          }}
                        >
                          <AiOutlineMinus size={25} />
                        </button>
                      </div>

                      <div className="text-gray-700 font-bold w-8 flex justify-between items-center">
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          value={data.quantity}
                          className="w-8"
                          type="number"
                          onChange={() => null}
                        />
                      </div>

                      <div className="">
                        <button
                          className="bg-slate-200 rounded-full p-1 px-3 mt-2"
                          onClick={() =>
                            dispatch(increaseItemQuantity(data.id))
                          }
                        >
                          <AiOutlinePlus size={25} />
                        </button>
                      </div>
                    </div>

                    <div className="text-xxxl font-bold lg:mt-6 flex justify-center items-center">
                      {data.price}
                    </div>
                  </div>

                  <div className="lg:h-56 flex justify-center items-center lg:mr-10">
                    <button
                      type="button"
                      className="mt-2"
                      h-10
                      title="Remove item"
                      onClick={() => {
                        dispatch(remove(data.id));
                        toast.success("Successfully Deleted the Product!", {
                          position: "top-left",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      <MdDelete size={25} />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 ? (
                <div>
                  <h3 className="flex justify-center items-center text-4xl">
                    No Item in Cart
                  </h3>
                </div>
              ) : (
                <div className="flex justify-center items-center h-20">
                  <button
                    className="bg-neutral-200 font-bold p-1 px-3"
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
            <br />
            <hr />
            <br />
            <div className=" p-5 flex justify-end">
              <div className="mb-4  p-5 rounded-md w-72">
                <div className="py-3">
                  <h5 className="mb-0 font-bold text-4xl">Summary</h5>
                </div>
                <div className="">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span className="float-right">{totalQuantity}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>

                        <strong className="float-right">{totalPrice}</strong>
                      </div>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className={`bg-neutral-200 font-bold p-1 px-3 mt-2 h-10 w-full ${
                      products.length === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={() => {
                      if (products.length === 0) {
                        toast.error("Your cart is empty. Cannot place order.", {
                          position: "top-left",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      } else {
                        navigate("/thankyou");
                        dispatch(clearCart());
                        toast.success("Your Order is Successful!", {
                          position: "top-left",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
