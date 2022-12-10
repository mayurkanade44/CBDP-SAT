import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  allCatalogue: [],
  activeService: "",
  activeCatalogue:"Services"
};

export const getAllCatalogue = createAsyncThunk(
  "catalogue/services",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/catalogue/service");
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
      state.activeCatalogue = catalogue
    },
  },
  extraReducers: {
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

export const { activeBtn } = catalogueSlice.actions;

export default catalogueSlice.reducer;
