import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parcelInfo: null,
};

// Action creators are generated for each case reducer function
export const parcelInfoDataSlice = createSlice({
  name: "parcel-data",
  initialState,
  reducers: {
    setParcelData: (state, action) => {
      state.parcelInfo = action.payload;
    },
  },
});

export const { setParcelData } = parcelInfoDataSlice.actions;

export default parcelInfoDataSlice.reducer;
