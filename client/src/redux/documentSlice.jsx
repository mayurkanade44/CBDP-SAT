import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  docLoading: false,
  allDocs: [],
  serviceDocs: [],
  
};

export const getAllDocs = createAsyncThunk(
  "document/allDocs",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/documents/allDocs");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getServiceDocs = createAsyncThunk(
  "document/serviceDocs",
  async (name, thunkAPI) => {
    try {
      const res = await axios.get(`/documents/service/${name}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    filterDoc: (state, { payload: { name } }) => {
      const filterDocs = state.serviceDocs.filter(
        (item) => item.typeOfFile === name
      );
      state.allDocs = filterDocs;
    },
  },
  extraReducers: {
    [getAllDocs.pending]: (state) => {
      state.docLoading = true;
    },
    [getAllDocs.fulfilled]: (state, { payload }) => {
      state.docLoading = false;
      state.allDocs = payload.documents;
      state.serviceDocs = payload.documents;
    },
    [getAllDocs.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [getServiceDocs.pending]: (state) => {
      state.docLoading = true;
    },
    [getServiceDocs.fulfilled]: (state, { payload }) => {
      state.docLoading = false;
      state.allDocs = payload.serviceDoc;
      state.serviceDocs = payload.serviceDoc;
    },
    [getServiceDocs.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { filterDoc } = documentSlice.actions;

export default documentSlice.reducer;
