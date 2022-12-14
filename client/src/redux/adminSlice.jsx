import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  loading: false,
  allCatalogue: [],
  activeService: "",
  activeCatalogue: "Services",
  catalogueType: "",
  serviceName: "",
  fileType: "",
  fileName: "",
  isEditing: false,
  editDocId: "",
  show: "All Users",
  file: "",
};

export const addCatalogue = createAsyncThunk(
  "catalogue/add",
  async (catalogue, thunkAPI) => {
    try {
      const res = await axios.post("/admin/service", catalogue);
      thunkAPI.dispatch(clearAdminValues());
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
    clearAdminValues: (state) => {
      state.catalogueType = "";
      state.serviceName = "";
      state.fileType = "";
      state.editDocId = "";
      state.file = "";
      state.fileName = "";
      state.isEditing = false;
    },
    setEditDoc: (state, { payload }) => {
      return { ...state, isEditing: true, show: "Add Document", ...payload };
    },
    setShow: (state, { payload }) => {
      state.show = payload;
    },
  },
  extraReducers: {
    [addCatalogue.pending]: (state) => {
      state.loading = true;
    },
    [addCatalogue.fulfilled]: (state, { payload }) => {
      state.loading = false;
      toast.success(payload.msg);
    },
    [addCatalogue.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error(payload);
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
      toast.error(payload);
    },
  },
});

export const {
  activeBtn,
  handleAdminChange,
  clearAdminValues,
  setEditDoc,
  setShow,
} = catalogueSlice.actions;

export default catalogueSlice.reducer;
