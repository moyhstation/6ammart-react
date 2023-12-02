import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterDrawerOpen: false,

  filterData: {
    sortBy: "",
    filterBy: {
      veg: false,
      nonVeg: false,
      currentAvailableFoods: false,
      discountedFoods: false,
    },
    price: "",
    rating: "",
    deliveryManInfo: null,
  },
};

export const searchFilterSlice = createSlice({
  name: "search-filter",
  initialState,
  reducers: {
    setSortbyByDispatch: (state, action) => {
      state.filterData.sortBy = action.payload;
    },
    setFilterbyByDispatch: (state, action) => {
      state.filterData.filterBy = action.payload;
    },
    setPriceByDispatch: (state, action) => {
      state.filterData.price = action.payload;
    },
    setRatingByDispatch: (state, action) => {
      state.filterData.rating = action.payload;
    },
    setFilterDrawerOpenByDispatch: (state, action) => {

      state.isFilterDrawerOpen = action.payload;
    },
    setDeliveryManInfoByDispatch: (state, action) => {
      state.deliveryManInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSortbyByDispatch,
  setFilterbyByDispatch,
  setPriceByDispatch,
  setRatingByDispatch,
  setFilterDrawerOpenByDispatch,
  setBannerFoodByDispatch,
  setDeliveryManInfoByDispatch,
} = searchFilterSlice.actions;
export default searchFilterSlice.reducer;
