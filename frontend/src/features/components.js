import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  components: [],
};

export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    addComponents: (data) => {
      this.components = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addComponents } = componentSlice.actions;
export default componentSlice.reducer;
