import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch } from "../utilis/auth";

const initialState = {
  loading: false,
  allCatalogue: [],
  activeService: "",
  activeCatalogue: "Services",
  catalogueType: "",
  serviceName: "",
  fileType: "",
  fileName: "",
  description: "",
  isEditing: false,
  editDocId: "",
  show: "All Users",
  file: "",
  sendMailData: [],
};

export const addCatalogue = createAsyncThunk(
  "catalogue/add",
  async (catalogue, thunkAPI) => {
    try {
      const res = await authFetch.post("/admin/service", catalogue);
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
      const res = await authFetch.get("/admin/service");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getMailData = createAsyncThunk(
  "catalogue/mailData",
  async (_, thunkAPI) => {
    try {
      const res = await authFetch.get("/admin/sendMailData");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const addVideo = createAsyncThunk(
  "upskill/addVideo",
  async (video, thunkAPI) => {
    try {
      const res = await authFetch.post("/upskill/video", video);
      thunkAPI.dispatch(clearAdminValues());
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
      state.activeCatalogue = "Services";
    },
    setEditDoc: (state, { payload }) => {
      return { ...state, isEditing: true, show: "Add Document", ...payload };
    },
    setShow: (state, { payload }) => {
      state.show = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCatalogue.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCatalogue.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allCatalogue = payload.services;
        toast.success(payload.msg);
      })
      .addCase(addCatalogue.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(getAllCatalogue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCatalogue.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allCatalogue = payload.services;
      })
      .addCase(getAllCatalogue.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(getMailData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMailData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sendMailData = payload.sendMails;
      })
      .addCase(getMailData.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      })
      .addCase(addVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVideo.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.success(payload.msg);
      })
      .addCase(addVideo.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
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
