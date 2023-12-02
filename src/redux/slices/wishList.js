import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: {
    item: [],
    store: [],
  },
};

export const wishListSlice = createSlice({
  name: "wishLists",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishLists = action.payload;
    },
    addWishList: (state, action) => {
      wishLists: state.wishLists.item.push(action.payload);
    },
    addWishListStore: (state, action) => {
      wishLists: state.wishLists.store.push(action.payload);
    },
    removeWishListItem: (state = initialState, action) => {
      let tempWishList = state.wishLists.item?.filter(
        (item) => item.id !== action.payload
      );

      return {
        wishLists: {
          ...state.wishLists,
          item: [...tempWishList],
        },
      };
    },
    removeWishListStore: (state = initialState, action) => {
      let tempWishList = state.wishLists.store?.filter(
        (item) => item.id !== action.payload
      );
      return {
        wishLists: {
          ...state.wishLists,
          store: [...tempWishList],
        },
      };
    },
    clearWishList: (state = initialState, action) => {
      state.wishLists.item = action.payload;
      state.wishLists.store = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWishList,
  removeWishListItem,
  addWishList,
  removeWishListStore,
  addWishListStore,
  clearWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
