import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  otherLoading: false,
  contract: "",
};

export const getServiceCards = createAsyncThunk(
  "/serviceCards",
  async (contract, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://contractqr.herokuapp.com/api/serviceCard?contract=${contract}`
      );
      console.log(res.data.cards);
      return res.data
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getServiceCards.pending, (state) => {
      state.otherLoading = true;
    });
  },
});

export default otherSlice.reducer;
