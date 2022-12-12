import { configureStore } from "@reduxjs/toolkit";
import catalogueSlice from "./adminSlice";
import documentSlice from "./documentSlice";

export const store = configureStore({
  reducer: {
    admin: catalogueSlice,
    doc: documentSlice,
  },
});
