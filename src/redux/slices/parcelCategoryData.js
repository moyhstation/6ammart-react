import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parcelCategories: null,
};

// Action creators are generated for each case reducer function
export const parcelICategoriesSlice = createSlice({
  name: "parcel-categories",
  initialState,
  reducers: {
    setParcelCategories: (state, action) => {
      state.parcelCategories = action.payload;
    },
  },
});

export const { setParcelCategories } = parcelICategoriesSlice.actions;

export default parcelICategoriesSlice.reducer;
