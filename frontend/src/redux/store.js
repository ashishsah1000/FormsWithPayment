import { configureStore } from "@reduxjs/toolkit";
import { componentReducer } from "../features/components";

export const store = configureStore({
  reducer: {
    components: componentReducer,
  },
});
