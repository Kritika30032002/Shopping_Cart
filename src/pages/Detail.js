import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../store/productSlice";
import { add, remove } from "../store/cartSlice";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Tooltip } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Update from "../components/Update";

const Detail = () => {
  const { pid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // console.log(pid);

  const { data: products } = useSelector((state) => state.product);
  // console.log("total products", products);
  let item = products.find((pro) => pro.id === parseInt(pid));
  // console.log(item);

  const handleAdd = (product) => {
    const value = {
      ...product,
      id: parseInt(pid),
      quantity: parseInt(selectedQuantity) || 1,
      proid: item.proid,
    };
    dispatch(add(value));
    toast.success("Successfully Added the Product!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="">
      <Navbar />

      {item && (
        <>
          <div className="flex flex-col mt-14">
            <div className="flex flex-row justify-between ">
              <div>
                <Tooltip title="Back to Products">
                  <Link to="/">
                    <button className="font-bold p-2 m-2">
                      <BsArrowLeft size={30} />
                    </button>
                  </Link>
                </Tooltip>
              </div>
              <div className="flex  m-4">
                <Tooltip title="Delete the Product">
                  <button
                    className=""
                    onClick={async () => {
                      await dispatch(deleteProduct(item.id));
                      await dispatch(remove(item.id));
                      dispatch(fetchProducts());
                      navigate("/");
                    }}
                  >
                    <MdDelete size={25} />
                  </button>
                </Tooltip>

                <Update pid={item.id} />
              </div>
            </div>
            <div className="m-5 grid lg:grid-cols-3 grid-cols-1 ">
              <div className="flex items-center h-64 lg:h-72 justify-center">
                <img
                  src={item?.image[0]?.thumbUrl}
                  className="h-72 p-10 "
                  alt="productimage "
                />
              </div>

              <div className="col-span-2 ">
                <div className="p-1 mb-10 mr-10 ml-10">
                  <div>
                    <h3>
                      <strong>Id: </strong>
                      {item.proid}
                    </h3>
                  </div>
                  <br />
                  <div>
                    <h3>
                      <strong>Title: </strong>
                      {item.title}
                    </h3>
                  </div>
                  <br />
                  <div className="w-full">
                    <h3>
                      <strong>Description: </strong>
                      {item.description}
                    </h3>
                  </div>
                  <br />
                  <div>
                    <h3>
                      <strong>Category: </strong>
                      {item.category}
                    </h3>
                  </div>
                  <br />
                  <div>
                    <h3>
                      <strong>Price: </strong>₹{item.price}
                    </h3>
                  </div>
                  <br />
                  <div>
                    <h3>
                      <strong>Quantity: </strong>
                      <label for="quantity" className="sr-only">
                        Choose a state
                      </label>
                      <select
                        id="quantity"
                        value={selectedQuantity}
                        defaultValue={1}
                        onChange={(e) => setSelectedQuantity(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </h3>
                  </div>
                  <br />
                  <div className="flex items-center justify-center bg-neutral-950 text-white font-bold h-10 w-40 text-sm">
                    <div className="">
                      <AiOutlineShoppingCart size={20} />
                    </div>
                    <button
                      onClick={() => handleAdd(item)}
                      className="pl-2 text-sm"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
