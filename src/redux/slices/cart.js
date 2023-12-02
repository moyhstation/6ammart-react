import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import {
  getConvertDiscount,
  getTotalVariationsPrice,
} from "../../utils/CustomFunctions";

const initialState = {
  cartItem: null,
  cartList: [],
  campaignItemList: [],
  buyNowItemList: [],
  campaignItem: null,
  type: "regular",
  totalAmount: null,
  walletAmount: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartList: (state = initialState, action) => {
      state.cartList = action.payload;
    },
    setCart: (state = initialState, action) => {
      if (action.payload.module_type !== "food") {
        let isItemExist = state?.cartList?.find(
          (obj) => obj.id === action.payload.id
        );

        if (isItemExist) {
          if (isItemExist?.selectedOption) {
            if (
              JSON.stringify(isItemExist?.selectedOption) !==
              JSON.stringify(action.payload?.selectedOption)
            ) {
              state.cartList.push(action.payload);
            }
          } else {
            state.cartList.push(action.payload);
          }
        } else {
          state.cartList = [...state.cartList, { ...action.payload }];
        }
      } else {
        //for food module

        let isPayloadItemMatches = false;
        if (state.cartList?.length > 0) {
          for (let i = 0; i < state.cartList.length; i++) {
            if (
              _.isEqual(
                state.cartList[i].food_variations,
                action.payload.food_variations
              ) &&
              state.cartList[i].id === action.payload.id
            ) {
              isPayloadItemMatches = true;
              state.cartList[i] = {
                ...state.cartList[i],
                totalPrice:
                  state.cartList[i].totalPrice + action.payload.totalPrice,
                quantity: state.cartList[i].quantity + action.payload.quantity,
              };
              return;
            } else {
              isPayloadItemMatches = false;
            }
          }
          if (!isPayloadItemMatches) {
            state.cartList.push(action.payload);
          }
        } else {
          state.cartList = [
            ...state?.cartList,
            {
              ...action.payload,
            },
          ];
        }
      }
    },
    setVariationToCart: (state = initialState, action) => {
      let isAvailable = state.cartList.filter(
        (item) => item.id === action.payload.id
      );
      if (isAvailable.length > 0) {
        let isA = isAvailable.filter((item) =>
          item.variation.some(
            (va) =>
              JSON.stringify(va) === JSON.stringify(action.payload.variation[0])
          )
        );
        if (isA.length === 0) {
          state.cartList.push(action.payload);
        }
      }
    },
    setUpdateItemToCart: (state = initialState, action) => {
      let index = state.cartList.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item?.selectedOption) ===
            JSON.stringify(action.payload?.selectedOption)
      );
      let newData = state.cartList.map((item, i) =>
        i === index ? action.payload : item
      );
      state.cartList = action.payload;
    },
    setUpdateVariationToCart: (state = initialState, action) => {
      if (action.payload.newObj.module_type === "food") {
        const index = state.cartList.findIndex(
          (item, index) => index === action.payload.indexNumber
        );
        const newData = state.cartList.map((item, i) =>
          i === index ? action.payload.newObj : item
        );
        state.cartList = newData;
      }
    },
    setIncrementToCartItem: (state = initialState, action) => {
      let newData;
      if (getCurrentModuleType() === "food") {
        if (action.payload.food_variations.length > 0) {
          let index = state.cartList.findIndex((item) =>
            _.isEqual(item.food_variations, action.payload.food_variations)
          );
          newData = state.cartList.map((item, i) =>
            // action.payload.totalPrice * action.payload.quantity  +

            i === index
              ? {
                  ...item,
                  totalPrice: action.payload.totalPrice,
                  quantity: action.payload.quantity,
                }
              : item
          );
        } else {
          newData = state.cartList.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  totalPrice:action.payload.totalPrice,
                  quantity: action.payload.quantity,
                }
              : item
          );
        }
      } else {
        newData = state.cartList.map((stateItem) => {
          if (
            stateItem.id === action.payload.id &&
            JSON.stringify(stateItem?.selectedOption) ===
              JSON.stringify(action.payload?.selectedOption)
          ) {
            return {
              ...action.payload,
              price: action.payload.price,
              quantity: action.payload.quantity ,
              totalPrice:action.payload.totalPrice,
            };
          } else {
            return stateItem;
          }
        });
      }
      state.cartList = newData;
    },
    setDecrementToCartItem: (state = initialState, action) => {
      // const price =
      //   action?.payload?.price +
      //   getTotalVariationsPrice(action.payload.food_variations);
      // //here quantity is decremented with number 1
      // const productPrice = price * (action.payload.quantity);
      // const discountedTotalPrice = getConvertDiscount(
      //   action.payload.discount_type === "amount"
      //     ? action.payload.discount * (action.payload.quantity )
      //     : action.payload.discount,
      //   action.payload.discount_type,
      //   productPrice,
      //   action.payload.store_discount
      // );

      // without food module
      let newData;
      if (getCurrentModuleType() === "food") {
        if (action.payload.food_variations.length > 0) {
          let index = state.cartList.findIndex((item) =>
            _.isEqual(item.food_variations, action.payload.food_variations)
          );

          newData = state.cartList.map((item, i) =>
            i === index
              ? {
                  ...item,
                  totalPrice: action.payload.totalPrice,
                  quantity: action.payload.quantity ,
                }
              : item
          );
        } else {
          newData = state.cartList.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  totalPrice: action.payload.totalPrice,
                  quantity: action.payload.quantity ,
                }
              : item
          );
        }
      } else {
        newData = state.cartList.map((stateItem) => {
          if (
            stateItem.id === action.payload.id &&
            JSON.stringify(stateItem?.selectedOption) ===
              JSON.stringify(action.payload?.selectedOption)
          ) {
            return {
              ...action.payload,
              price: action.payload.price,
              quantity: action.payload.quantity ,
              totalPrice:action.payload.totalPrice,
            };
          } else {
            return stateItem;
          }
        });
      }

      state.cartList = newData;
    },
    setRemoveItemFromCart: (state = initialState, action) => {
      state.cartList = state.cartList.filter((cartItem) =>
        cartItem.module_type === action.payload.module_type
          ? cartItem?.id === action.payload.id
            ? JSON.stringify(cartItem?.selectedOption) !==
              JSON.stringify(action.payload?.selectedOption)
            : cartItem
          : cartItem
      );
    },
    setCampaignItemList: (state = initialState, action) => {
      state.campaignItemList = [action.payload];
    },
    setBuyNowItemList: (state = initialState, action) => {
      state.buyNowItemList = [action.payload];
    },
    setCampaignItem: (state = initialState, action) => {
      state.campaignItem = action.payload;
    },
    setClearCart: (state = initialState, action) => {
      const currentModule = getCurrentModuleType();
      state.cartList = state?.cartList?.filter(
        (item) => item?.module_type !== currentModule
      );
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setWalletAmount: (state, action) => {
      state.walletAmount = action.payload;
    },
  },
});
export const {
  cart,
  setCartList,
  setCart,
  setUpdateItemToCart,
  setVariationToCart,
  setCampaignItemList,
  setBuyNowItemList,
  setCampaignItem,
  setClearCart,
  setIncrementToCartItem,
  setDecrementToCartItem,
  setRemoveItemFromCart,
  setUpdateVariationToCart,
  setTotalAmount,
  setWalletAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
