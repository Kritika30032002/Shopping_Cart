import { combineReducers } from "redux";
import cartReducer from "../store/cartSlice";
import productReducer from "../store/productSlice";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
