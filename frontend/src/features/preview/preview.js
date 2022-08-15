import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previewId: 0,
  responses: [],
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewFor: (state, action) => {
      state.previewId = action.payload;
    },
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    updateResponse: (state, action) => {
      console.log(action.payload);
      state.responses[action.payload.id] = action.payload;
    },
  },
});

export const { setPreviewFor, setResponses, updateResponse } =
  previewSlice.actions;

export default previewSlice.reducer;
