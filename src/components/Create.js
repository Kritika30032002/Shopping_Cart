import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";
import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import ProductModal from "./ProductModal";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleFinish = async (values) => {
    const random = parseInt("73" + Math.floor(1000 + Math.random() * 9000));

    const value = {
      ...values,
      quantity: 1,
      proid: random,
    };
    await dispatch(addProduct(value));
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <Tooltip title="Add new Product">
        <Button className="cursor-pointer border-none p-0" onClick={showModal}>
          <AiOutlinePlus className="hover:text-black" size={30} />
        </Button>
      </Tooltip>
      <ProductModal
        heading="Add new Product"
        visible={open}
        onCancel={() => setOpen(false)}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default Create;
