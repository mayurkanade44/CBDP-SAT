import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  otherLoading: false,
  contract: "",
  serviceCards: [],
};

export const getServiceCards = createAsyncThunk(
  "/serviceCards",
  async (contract, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://contractqr.herokuapp.com/api/serviceCard?contract=${contract}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    handleOtherChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceCards.pending, (state) => {
        state.otherLoading = true;
      })
      .addCase(getServiceCards.fulfilled, (state, { payload }) => {
        state.otherLoading = false;
        if (payload.cards <= 0) {
          toast.error("No contract found");
        }
        state.serviceCards = payload.cards;
      })
      .addCase(getServiceCards.rejected, (state, { payload }) => {
        state.otherLoading = false;
      });
  },
});

export const { handleOtherChange } = otherSlice.actions;

export default otherSlice.reducer;
