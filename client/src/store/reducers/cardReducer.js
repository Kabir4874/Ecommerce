import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_card = createAsyncThunk(
  "auth/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // try {
    //   const { data } = await api.post("/customer/customer-register", info);
    //   localStorage.setItem("customerToken", data.token);
    //   return fulfillWithValue(data);
    // } catch (error) {
    //   return rejectWithValue(error.response.data);
    // }
  }
);

export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_products_count: 0,
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
      .addCase(add_to_card.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_to_card.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(add_to_card.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      });
  },
});
export const { messageClear } = cardReducer.actions;
export default cardReducer.reducer;
