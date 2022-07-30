import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "../features/component/components";

export const store = configureStore({
  reducer: {
    component: componentReducer,
  },
});
