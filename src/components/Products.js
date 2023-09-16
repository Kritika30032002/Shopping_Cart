import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/cartSlice";
import { fetchProducts, deleteProduct } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";
// import Update from "../pages/Update";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  //   console.log(products);
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
    toast.success("Successfully Added to Cart!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Error....</h2>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 place-items-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          className="hover:bg-slate-100 border-opacity-50 rounded-lg relative flex flex-col p-4 pb-0 w-80 lg:w-auto"
          key={product.id}
        >
          <Tooltip title="Delete">
            <button
              className="absolute top-0 right-0 m-2"
              onClick={async () => {
                await dispatch(deleteProduct(product.id));
                await dispatch(remove(product.id));
                dispatch(fetchProducts());
              }}
            >
              <ImCross color="gray" size={15} />
            </button>
          </Tooltip>
          <div className="p-4 pb-0 justify">
            <Link className="mt-4" to={`/detail/${product.id}`}>
              <img
                className="max-h-56 mx-auto"
                src={product?.image[0]?.thumbUrl}
                alt=""
              />
              <div className="flex items-center justify-center">
                <h4 className="w-48 m-3 lg:h-16 text-justify ">
                  {product.title}
                </h4>
              </div>

              <div className="flex justify-center items-center text-center">
                <h5 className="lg:h-10 w-48 pt-1">₹{product.price}</h5>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center lg:h-20">
            <div className="bg-neutral-200 font-bold w-40 text-sm p-2 mb-4 flex items-center justify-center">
              <AiOutlineShoppingCart size={20} />
              <button onClick={() => handleAdd(product)} className="pl-2">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
