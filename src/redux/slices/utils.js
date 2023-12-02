import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedModule: null,
  orderType: 0,
  currentTab: "",
};
export const utilsSlice = createSlice({
  name: "utils-data",
  initialState,
  reducers: {
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setSelectedModule, setOrderType, setCurrentTab } =
  utilsSlice.actions;

export default utilsSlice.reducer;
