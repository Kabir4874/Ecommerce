import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_card = createAsyncThunk(
  "auth/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-card", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_card_products = createAsyncThunk(
  "auth/get_card_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-card-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_card_product = createAsyncThunk(
  "auth/delete_card_product",
  async (card_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-card-product/${card_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_products_count: 0,
    buy_product_item: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outOfStock_products: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_card.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(add_to_card.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.card_products_count = state.card_products_count + 1;
      })
      .addCase(get_card_products.fulfilled, (state, { payload }) => {
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_products_count = payload.card_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outOfStock_products = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      });
  },
});
export const { messageClear } = cardReducer.actions;
export default cardReducer.reducer;
