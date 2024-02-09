import { getCurrentModuleId, getCurrentModuleType } from "./getCurrentModuleType";

export const getCartListModuleWise = (cartList) => {
  let newArray = [];
  if (cartList && cartList?.length > 0) {
    cartList?.forEach(
    (cart) =>{
      cart?.module?.id === getCurrentModuleId() &&
      newArray.push(cart)
    }
      );
    return newArray;
  } else {
    return newArray;
  }
};
