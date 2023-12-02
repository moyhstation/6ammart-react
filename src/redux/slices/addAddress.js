import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddressModal: false,
};

// Action creators are generated for each case reducer function
export const addAddressSlice = createSlice({
  name: "addAddress",
  initialState,
  reducers: {
    setOpenAddressModal: (state, action) => {
      state.openAddressModal = action.payload;
    },
  },
});

export const { setOpenAddressModal } = addAddressSlice.actions;

export default addAddressSlice.reducer;
