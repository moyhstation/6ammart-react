import { useQuery } from "react-query";
import { get_wish_list_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

export const WishList = async () => {
  const { data } = await MainApi.get(`${get_wish_list_api}`);
  return data;
};
export const useWishListGet = (onSuccessHandler) => {
  return useQuery("wishlist", () => WishList(), {
    enabled: false,
    retry: false,
    onSuccess: onSuccessHandler,
  });
};
