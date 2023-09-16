import Products from "./../components/Products";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  items: Products,
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
    add(state, action) {
      let find = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log("find", find);
      console.log("action", action.payload);
      if (find >= 0) {
        state.products[find].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.products.reduce(
        (cartTotal, cartItem) => {
          // console.log("carttotal", cartTotal);
          // console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          // console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
    remove(state, action) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseItemQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
  },
});

export const {
  add,
  remove,
  clearCart,
  getCartTotal,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
