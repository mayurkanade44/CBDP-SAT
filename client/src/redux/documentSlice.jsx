import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  docLoading: false,
  allDocs: [],
  serviceDocs: [],
  search: "",
  emailTo: "",
  filesCart: {},
};

export const getAllDocs = createAsyncThunk(
  "document/allDocs",
  async ({ search }, thunkAPI) => {
    try {
      let url = "/documents/allDocs";
      if (search) url = url + `?search=${search}`;
      const res = await axios.get(url);
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

export const sendMail = createAsyncThunk(
  "document/sendMail",
  async (mail, thunkAPI) => {
    try {
      const res = await axios.post("/documents/sendMail", mail);
      thunkAPI.dispatch(clearValues());
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
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    attachFile: (state, { payload: { file, name } }) => {
      state.filesCart[name] = file;
    },
    removeFile: (state, { payload: { name } }) => {
      delete state.filesCart[name];
    },
    clearValues: () => {
      return {
        ...initialState,
      };
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
    [sendMail.pending]: (state) => {
      state.docLoading = true;
    },
    [sendMail.fulfilled]: (state, { payload }) => {
      state.docLoading = false;
      console.log(payload.msg);
    },
    [sendMail.rejected]: (state, { payload }) => {
      state.docLoading = false;
      console.log(payload.msg);
    },
  },
});

export const { filterDoc, handleChange, attachFile, removeFile, clearValues } =
  documentSlice.actions;

export default documentSlice.reducer;
