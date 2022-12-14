import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  docLoading: false,
  allDocs: [],
  serviceDocs: [],
  search: "",
  emailTo: "",
  filesCart: {},
};

export const addDoc = createAsyncThunk(
  "document/addDoc",
  async (myForm, thunkAPI) => {
    try {
      const res = await axios.post("/documents/allDocs", myForm);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editDoc = createAsyncThunk(
  "document/editDoc",
  async ({ editDocId, myForm }, thunkAPI) => {
    try {
      const res = await axios.patch(`/documents/editDoc/${editDocId}`, myForm);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteDoc = createAsyncThunk(
  "document/deleteDoc",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/documents/editDoc/${id}`);
      thunkAPI.dispatch(getAllDocs(thunkAPI.getState().search));
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllDocs = createAsyncThunk(
  "document/allDocs",
  async (search, thunkAPI) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(addDoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoc.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload.msg);
      })
      .addCase(addDoc.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(editDoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDoc.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload.msg);
      })
      .addCase(editDoc.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(deleteDoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoc.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload.msg);
      })
      .addCase(deleteDoc.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(getAllDocs.pending, (state) => {
        state.docLoading = true;
      })
      .addCase(getAllDocs.fulfilled, (state, { payload }) => {
        state.docLoading = false;
        state.allDocs = payload.documents;
        state.serviceDocs = payload.documents;
      })
      .addCase(getAllDocs.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getServiceDocs.pending, (state) => {
        state.docLoading = true;
      })
      .addCase(getServiceDocs.fulfilled, (state, { payload }) => {
        state.docLoading = false;
        state.allDocs = payload.serviceDoc;
        state.serviceDocs = payload.serviceDoc;
      })
      .addCase(getServiceDocs.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(sendMail.pending, (state) => {
        state.docLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, { payload }) => {
        state.docLoading = false;
        toast.success(payload.msg);
      })
      .addCase(sendMail.rejected, (state, { payload }) => {
        state.docLoading = false;
        toast.error(payload);
      });
  },
});

export const { filterDoc, handleChange, attachFile, removeFile, clearValues } =
  documentSlice.actions;

export default documentSlice.reducer;
