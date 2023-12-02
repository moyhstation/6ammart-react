import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import MainApi from "../../../MainApi";
import { delete_wish_list_api } from "../../../ApiRoutes";
//import { onErrorResponse } from '../../../../components/api-response-messages/ApiResponseMessages'

const deleteData = async (wishListId) => {
  const { data } = await MainApi.delete(
    `${delete_wish_list_api}?store_id=${wishListId}`
  );
  return data;
};
export const useWishListStoreDelete = () => {
  return useMutation("delete_wishlist", deleteData);
};
