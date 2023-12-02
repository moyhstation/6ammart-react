import MainApi from "../../../MainApi";
import { cart_all_item_remove, cart_item_delete } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const deleteItem = async (cartIdAndGuestId) => {
  if (cartIdAndGuestId?.guestId) {
    const { data } = await MainApi.delete(
      `${cart_item_delete}?guest_id=${cartIdAndGuestId?.guestId}&cart_id=${cartIdAndGuestId?.cart_id}`
    );
    return data;
  } else {
    const { data } = await MainApi.delete(
      `${cart_item_delete}?cart_id=${cartIdAndGuestId?.cart_id}`
    );
    return data;
  }
};

export default function useDeleteCartItem() {
  return useMutation("delete-all-cart-item", deleteItem);
}
