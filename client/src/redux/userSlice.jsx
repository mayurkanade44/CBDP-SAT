import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch } from "../utilis/auth";

const initialState = {
  userLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUsers: [],
  email: "",
  password: "",
  name: "",
  role: "",
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (login, thunkAPI) => {
    try {
      const res = await authFetch.post("/user/login", login);
      thunkAPI.dispatch(clearValues());
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (register, thunkAPI) => {
    try {
      const res = await authFetch.post("/user/register", register);
      thunkAPI.dispatch(clearValues());
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllUsers = createAsyncThunk("user/all", async (_, thunkAPI) => {
  try {
    const res = await authFetch.get("/user/all");
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const userDelete = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.delete(`/user/delete/${id}`);
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
    clearValues: (state) => {
      state.email = "";
      state.name = "";
      state.password = "";
      state.role = "";
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.allUsers = payload.users;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.userLoading = false;
        toast.error(payload);
      })
      .addCase(userRegister.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.allUsers = payload.users;
        toast.success(payload.msg);
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.userLoading = false;
        toast.error(payload);
      })
      .addCase(userDelete.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(userDelete.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.allUsers = payload.users;
        toast.success(payload.msg);
      })
      .addCase(userDelete.rejected, (state, { payload }) => {
        state.userLoading = false;
        toast.error(payload.msg);
      });
  },
});

export const { handleUserChange, clearValues } = userSlice.actions;

export default userSlice.reducer;
