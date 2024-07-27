import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelled: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(add_to_card.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.error;
    //   })
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
