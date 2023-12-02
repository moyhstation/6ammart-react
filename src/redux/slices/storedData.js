import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  subCategories: [],
  popularStores: [],
  newStores: [],
  basicCampaigns: [],
  banners: {
    banners: [],
    campaigns: [],
  },
  featuredCategories: [],
  popularItemsNearby: {
    products: [],
  },
  runningCampaigns: [],
  newArrivalStores: [],
  bestReviewedItems: {
    products: [],
  },
  youWillLoveItems: {
    products: [],
  },
  AllSaveAddress: [],
};

export const storedDataSlice = createSlice({
  name: "stored-data",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setPopularStores: (state, action) => {
      state.popularStores = action.payload;
    },
    setNewStores: (state, action) => {
      state.newStores = action.payload;
    },
    setBasicCampaigns: (state, action) => {
      state.basicCampaigns = action.payload;
    },
    setBanners: (state, action) => {
      state.banners.banners = action.payload.banners;
      state.banners.campaigns = action.payload.campaigns;
    },
    setFeaturedCategories: (state, action) => {
      state.featuredCategories = action.payload;
    },
    setPopularItemsNearby: (state, action) => {
      state.popularItemsNearby = {
        ...action.payload,
        products: action.payload.products,
      };
    },
    setRunningCampaigns: (state, action) => {
      state.runningCampaigns = action.payload;
    },
    setNewArrivalStores: (state, action) => {
      state.newArrivalStores = action.payload;
    },
    setBestReviewedItems: (state, action) => {
      state.bestReviewedItems = {
        ...action.payload,
        products: action.payload.products,
      };
    },
    setYouWillLoveItems: (state, action) => {
      state.youWillLoveItems = {
        ...action.payload,
        products: action.payload.products,
      };
    },
    setAllSaveAddress: (state, action) => {
      state.AllSaveAddress = action.payload;
    },
    setResetStoredData: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setSubCategories,
  setPopularStores,
  setNewStores,
  setBasicCampaigns,
  setBanners,
  setFeaturedCategories,
  setPopularItemsNearby,
  setRunningCampaigns,
  setNewArrivalStores,
  setBestReviewedItems,
  setYouWillLoveItems,
  setResetStoredData,
  setAllSaveAddress,
} = storedDataSlice.actions;
export default storedDataSlice.reducer;
