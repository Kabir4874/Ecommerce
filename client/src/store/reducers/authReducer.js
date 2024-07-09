import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/api'

export const customer_register= createAsyncThunk(
    'auth/customer_register',
    async(info,{})=>{
        try {
            const {data}= await api.post()
        } catch (error) {
            console.log(error.response.data);
        }
    }
)

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(get_category.fulfilled, (state, { payload }) => {
    //     state.categorys = payload.categorys;
    //   })
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
