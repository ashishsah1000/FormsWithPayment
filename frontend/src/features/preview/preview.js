import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previewId: 0,
  responses: [],
  userDetails: {},
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
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

export const { setPreviewFor, setResponses, updateResponse, setUserDetails } =
  previewSlice.actions;

export default previewSlice.reducer;
