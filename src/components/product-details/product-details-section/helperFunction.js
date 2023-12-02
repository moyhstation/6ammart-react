import { ACTION } from "./states";
import { store } from "../../../redux/store/index";
import {getTotalVariationsPrice} from "../../../utils/CustomFunctions";
import {getCurrentModuleType} from "../../../helper-functions/getCurrentModuleType";
export const handleInitialTotalPriceVarPriceQuantitySet = (
  productDetailsData,
  dispatch,
  cartList,
  handleChoices,
  selectedOptions,
  modalData
) => {
  if (productDetailsData) {
    if (productDetailsData?.selectedOption?.length > 0) {
      dispatch({
        type: ACTION.setModalData,
        payload: {
          ...productDetailsData,
          quantity: productDetailsData?.quantity
            ? productDetailsData?.quantity
            : 1,
          totalPrice: productDetailsData?.totalPrice
            ? productDetailsData?.totalPrice
            : productDetailsData?.selectedOption[0]?.price,
        },
      });
    } else {
      if (productDetailsData?.variations?.length > 0) {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...productDetailsData,
            selectedOption: [productDetailsData.variations[0]],
            quantity: productDetailsData?.quantity
              ? productDetailsData?.quantity
              : 1,
            totalPrice: productDetailsData?.totalPrice
              ? productDetailsData?.totalPrice
              : productDetailsData?.variations?.[0]?.price,
          },
        });
      } else {
        dispatch({
          type: ACTION.setModalData,
          payload: {
            ...productDetailsData,
            quantity: productDetailsData?.quantity
              ? productDetailsData?.quantity
              : 1,
            totalPrice: productDetailsData?.totalPrice
              ? productDetailsData?.totalPrice
              : productDetailsData?.price,
            selectedOption: [],
          },
        });
      }
    }
  }
  // if (cartList.length > 0) {
  //   const itemIsInCart = cartList.filter(
  //     (item) => item.id === productDetailsData.id
  //   );
  //   if (itemIsInCart.length > 0) {
  //     let variationIsMatch = itemIsInCart.find(
  //       (item) =>
  //         JSON.stringify(item.variation[0]) ===
  //         JSON.stringify(selectedOptions[0])
  //     );
  //
  //     if (variationIsMatch) {
  //       dispatch({
  //         type: ACTION.setModalData,
  //         payload: {
  //           ...modalData[0],
  //           totalPrice: variationIsMatch?.totalPrice,
  //           quantity: variationIsMatch?.quantity,
  //         },
  //       });
  //     }
  //   }
  // } else {
  //   if (
  //     productDetailsData?.variations &&
  //     productDetailsData?.variations.length > 0
  //   ) {
  //     dispatch({
  //       type: ACTION.setSelectedOptions,
  //       payload: [productDetailsData?.variations[0]],
  //     });
  //   } else {
  //   }
  // }
};
export const handleValuesFromCartItems = (variationValues) => {
  let value = [];
  if (variationValues?.length > 0) {
    variationValues?.forEach((item) => {
      if (item?.isSelected) {
        value.push(item.label);
      }
    });
  } else {
    value.push(variationValues[0].label);
  }
  return value;
};
export const getVariationsForCartData = (newVariation) => {
  newVariation?.length > 0
    ? newVariation?.map((variation) => {
        return {
          name: variation.name,
          values: {
            label: handleValuesFromCartItems(variation.values),
          },
        };
      })
    : [];
};
export const getItemDataForAddToCart = (values,updateQuantity, mainPrice,guest_id) => {

  let totalQty = 0;
  return {
    guest_id: guest_id,
    cart_id: values?.cartItemId,
    model: values?.available_date_starts ? "ItemCampaign" : "Item",
    add_on_ids:
      values?.add_ons?.length > 0
        ? values?.addons?.map((add) => {
            return add.id;
          })
        : [],
    add_on_qtys:
      values?.add_ons?.length > 0
        ? values?.addons?.map((add) => {
            totalQty += add.quantity;
            return totalQty;
          })
        : [],
    item_id: values?.id,
    price: mainPrice,
    quantity: updateQuantity,
    variation:
      values?.module_type === "food"
        ? values?.food_variations?.length > 0
          ? values?.food_variations?.map((variation) => {
              return {
                name: variation.name,
                values: {
                  label: handleValuesFromCartItems(variation.values),
                },
              };
            })
          : []
        : values?.selectedOption?.length > 0
        ? values?.selectedOption
        : [],
  };
};
export const getPriceAfterQuantityChange=(cart,Quantity)=>{
  let mainPrice=0
  const price =
      cart?.price +
      getTotalVariationsPrice(cart?.food_variations);
  //here quantity is incremented with number 1
  const productPrice = price * Quantity ;
   mainPrice=getCurrentModuleType() === "food" ? productPrice: (cart?.selectedOption?.length > 0
      ? cart?.selectedOption?.[0]?.price
      : cart?.price) * Quantity
  return mainPrice
}