import MainApi from "../../../MainApi";
import { order_place_api, update_payment_method_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const updateData = async (formData) => {
  const { data } = await MainApi.post(`${update_payment_method_api}`, formData);
  return data;
};
export const useUpdatePaymentMethod = () => {
  return useMutation("update-payment-method", updateData);
};
