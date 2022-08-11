import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previewId: 0,
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewFor: (state, action) => {
      state.previewId = action.payload;
    },
  },
});

export const { setPreviewFor } = previewSlice.actions;

export default previewSlice.reducer;
