import { configureStore } from "@reduxjs/toolkit";
import catalogueSlice from "./catalogueSlice";
import documentSlice from "./documentSlice";

export const store = configureStore({
  reducer: {
    catalogue: catalogueSlice,
    doc: documentSlice,
  },
});
