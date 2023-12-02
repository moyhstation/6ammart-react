import { useMutation } from "react-query";
import { add_wish_list_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const addStoreTOWishList = async (wishListId) => {
  const { data } = await MainApi.post(
    `${add_wish_list_api}?store_id=${wishListId}`
  );
  return data;
};
export const useAddStoreToWishlist = () => {
  return useMutation("delete_wishlist", addStoreTOWishList);
};
