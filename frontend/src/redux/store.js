import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "../features/component/components";
import previewReducer from "../features/preview/preview";

export const store = configureStore({
  reducer: {
    component: componentReducer,
    preview: previewReducer,
  },
});
