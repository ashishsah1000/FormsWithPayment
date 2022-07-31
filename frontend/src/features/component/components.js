import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedComponent: "",
  question: "",
  type: "",
  previewComponents: [],
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    selectComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
    addComponent: (state, action) => {
      state.previewComponents = [...state.previewComponents, action.payload];
    },
    addQuestion: (state, action) => {
      state.question = action.payload;
    },
    addType: (state, action) => {
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectComponent, addComponent, addQuestion, addType } =
  componentSlice.actions;
export default componentSlice.reducer;
