import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_seller_dashboard_index_data",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/seller/get-dashboard-index-data", {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_admin_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_admin_dashboard_index_data",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/get-dashboard-index-data", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardIndexReducer = createSlice({
  name: "dashboardIndex",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessages: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(categoryAdd.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
  },
});

export const { messageClear } = dashboardIndexReducer.actions;
export default dashboardIndexReducer.reducer;
