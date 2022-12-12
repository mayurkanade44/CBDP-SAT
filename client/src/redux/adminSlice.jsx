import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allCatalogue: [],
  activeService: "",
  activeCatalogue: "Services",
  catalogueType: "",
  serviceName: "",
  fileType: "",
};

export const addCatalogue = createAsyncThunk(
  "catalogue/add",
  async (catalogue, thunkAPI) => {
    try {
      const res = await axios.post("/admin/service", catalogue);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllCatalogue = createAsyncThunk(
  "catalogue/services",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/admin/service");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    activeBtn: (state, { payload: { name, catalogue } }) => {
      state.activeService = name;
      state.activeCatalogue = catalogue;
    },
    handleAdminChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: {
    [addCatalogue.pending]: (state) => {
      state.loading = true;
    },
    [addCatalogue.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [addCatalogue.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [getAllCatalogue.pending]: (state) => {
      state.loading = true;
    },
    [getAllCatalogue.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allCatalogue = payload.services;
    },
    [getAllCatalogue.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { activeBtn, handleAdminChange } = catalogueSlice.actions;

export default catalogueSlice.reducer;
