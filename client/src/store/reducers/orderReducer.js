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


export const orderReducer = createSlice({
  name: "order",
  initialState: {
    
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
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
