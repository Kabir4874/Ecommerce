import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "category/get_seller_request",
  async (
    { perPage, page, searchValue },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  "category/get_seller",
  async (sellerId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "category/seller_status_update",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_seller_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
