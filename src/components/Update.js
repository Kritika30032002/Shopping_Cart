import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../store/productSlice";
import { remove } from "../store/cartSlice";
import ProductModal from "./ProductModal";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "antd";

const Update = ({ pid }) => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.product);
  const item = products.find((pro) => pro.id === pid);
  // console.log(item.price);
  // console.log(typeof item.price);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleFinish = (values) => {
    const value = {
      ...values,
      id: pid,
      quantity: 1,
      proid: item.proid,
    };
    dispatch(updateProduct(value));
    dispatch(remove(value.id));
    dispatch(fetchProducts());
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit The Product">
        <button
          className=" font-bold ml-3 p-1 w-full text-xl h-10 text-center "
          onClick={showModal}
        >
          <MdModeEdit />
        </button>
      </Tooltip>
      <ProductModal
        heading="Edit Product"
        visible={open}
        onCancel={() => setOpen(false)}
        onFinish={handleFinish}
        initialValues={item}
      />
    </div>
  );
};

export default Update;
