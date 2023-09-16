import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

// fetch product
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (args, { rejectWithValue }) => {
    const response = await fetch("http://localhost:8000/data");
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return toast.error("Error while loading product!", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }
);

//add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch("http://localhost:8000/data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      toast.success("Successfully Added the Product!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return result;
    } catch (error) {
      return toast.error("Error while adding product!", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:8000/data/${id}`, {
      method: "DELETE",
    });

    try {
      const result = await response.json();
      console.log(result);
      toast.success("Successfully Deleted the Product!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return result;
    } catch (error) {
      return toast.error("Error while deleting!", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }
);

//update Product
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data, { rejectWithValue }) => {
    // console.log("updated data", data);
    const response = await fetch(`http://localhost:8000/data/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      toast.success("Successfully Updated the Product!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return result;
    } catch (error) {
      return toast.error("Error while updating product!", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    dataContainer: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    filteredProducts: (state, action) => {
      // console.log(action);
      // console.log(state.data);
      console.log("filter term", action.payload);
      state.data = state.dataContainer.filter((product) =>
        product.title.toLowerCase().includes(action.payload)
      );
    },
    // setProducts(state, action) {
    //     state.data = action.payload;
    // },
    // setStatus(state, action) {
    //     state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.dataContainer = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });

    //add product
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = "";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
        // state.isSuccess=action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.data = [];
        state.error = action.error.message;
      });

    //delete product
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(state, action.payload);
        const { id } = action.payload;
        if (id) {
          state.data = state.data.filter((ele) => ele.id !== id);
          state.dataContainer = state.data;
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        // state.data = [];
        state.error = action.error.message;
      });

    //update product
    builder
      .addCase(updateProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.data = state.data.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
        state.dataContainer = state.data;
        state.status = STATUSES.IDLE;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        // state.data = [];
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setStatus, filteredProducts } =
  productSlice.actions;
export default productSlice.reducer;
