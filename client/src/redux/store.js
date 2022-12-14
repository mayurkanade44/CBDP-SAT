import { configureStore } from "@reduxjs/toolkit";
import catalogueSlice from "./adminSlice";
import documentSlice from "./documentSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    admin: catalogueSlice,
    doc: documentSlice,
    user: userSlice,
  },
});
