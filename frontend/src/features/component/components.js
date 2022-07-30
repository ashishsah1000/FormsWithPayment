import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedComponent: "",
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    selectComponent: (state, action) => {
      console.log("was called from redux", state.selectedComponent);
      state.selectedComponent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectComponent } = componentSlice.actions;
export default componentSlice.reducer;
