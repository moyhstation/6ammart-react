import { useMutation } from "react-query";
import { delete_wish_list_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
//import { onErrorResponse } from '../../../../components/api-response-messages/ApiResponseMessages'

const deleteData = async (wishListId) => {
  const { data } = await MainApi.delete(
    `${delete_wish_list_api}?item_id=${wishListId}`
  );
  return data;
};
export const useWishListDelete = () => {
  return useMutation("delete_wishlist", deleteData);
};
