import MainApi from "../../../MainApi";
import { add_address_api, item_add_to_cart } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const addData = async (postData) => {
  const { data } = await MainApi.post(item_add_to_cart, postData);
  return data;
};

export default function useAddCartItem() {
  return useMutation("add-address", addData);
}
