import { useMutation } from "react-query";
import { add_wish_list_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const addTOWishList = async (wishListId) => {
  const { data } = await MainApi.post(
    `${add_wish_list_api}?item_id=${wishListId}`
  );
  return data;
};
export const useAddToWishlist = () => {
  return useMutation("add_wishlist", addTOWishList);
};
