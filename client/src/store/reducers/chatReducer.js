import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const add_friend = createAsyncThunk("chat/add_friend", async (info) => {
  try {
    const { data } = await api.post("/chat/customer/add-customer-friend", info);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(customer_register.pending, (state) => {
    //     state.loader = true;
    //   })
  },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
