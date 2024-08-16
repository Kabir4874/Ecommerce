import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "banner/categoryAdd",
  async ({ name, image }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(categoryAdd.rejected, (state, { payload }) => {
    //   state.loader = false;
    //   state.errorMessage = payload.error;
    // })
  },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
