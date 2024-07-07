import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_category = createAsyncThunk(
  "category/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/get-categorys");
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(admin_login.pending, (state) => {
    //     state.loader = true;
    //   })
    //   .addCase(admin_login.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(admin_login.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //     state.token = payload.token;
    //     state.role = returnRole(payload.token);
    //   });
  },
});

export default homeReducer.reducer;
