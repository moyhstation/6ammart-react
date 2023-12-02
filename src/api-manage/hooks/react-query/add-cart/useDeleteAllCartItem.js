import MainApi from "../../../MainApi";
import { cart_all_item_remove } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const deleteData = async (guestId) => {
  if (guestId) {
    const { data } = await MainApi.delete(
      `${cart_all_item_remove}?guest_id=${guestId}`
    );
    return data;
  } else {
    const { data } = await MainApi.delete(cart_all_item_remove);
    return data;
  }
};

export default function useDeleteAllCartItem() {
  return useMutation("delete-all-cart-item", deleteData);
}
