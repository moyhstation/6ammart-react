import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { all_cart_list } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import {getToken} from "../../../../helper-functions/getToken";

const getData = async (guestId) => {
  try {
    const userToken=getToken()
    const params = !userToken ? `?guest_id=${guestId}` : "";
    const { data } = await MainApi.get(`${all_cart_list}${params}`);
    return data;
  } catch (error) {
    throw error; // Rethrow the error to be caught by React Query
  }
};

export default function useGetAllCartList(guestId, cartListSuccessHandler) {
  return useQuery("cart-item", () => getData(guestId), {
    onSuccess: cartListSuccessHandler,
    enabled: false, // Enable the query only when guestId is defined
    onError: onSingleErrorResponse,
  });
}
