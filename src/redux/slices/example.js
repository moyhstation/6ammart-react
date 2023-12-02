import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  example: null,
  render: false,
};

// Action creators are generated for each case reducer function
export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setExample: (state, action) => {
      state.render = action.payload;
    },
  },
});

export const { setExample } = exampleSlice.actions;

export default exampleSlice.reducer;
