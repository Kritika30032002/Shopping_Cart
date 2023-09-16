// https://www.youtube.com/watch?v=b88Z5POQBwI

import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import productReducer from "./productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import { combineReducers } from "redux";
import rootReducer from "../components/rootReducer";

// const reducer = combineReducers({
//   product: productReducer,
//   cart: cartReducer,
// });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   cart: cartReducer,
  //   product: productReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
