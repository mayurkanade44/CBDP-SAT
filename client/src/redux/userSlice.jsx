import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  userLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUsers: [],
  email: "",
  password: "",
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (login, thunkAPI) => {
    try {
      const res = await axios.post("/user/login", login);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUserChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
        toast.success(payload.msg);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.userLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleUserChange } = userSlice.actions;

export default userSlice.reducer;
