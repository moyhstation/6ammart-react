import { useMutation } from "react-query";
import MainApi from "../../../MainApi";

const offlinePaymentUpdate = async (offlinePaymentData) => {
  const { data } = await MainApi.put("/api/v1/customer/order/offline-payment-update", offlinePaymentData);
  return data;
};

export const useOfflinePaymentUpdate = () => {
  return useMutation("offline_method_update", (offlinePaymentData) => offlinePaymentUpdate(offlinePaymentData), {
    // onError: (error) => {
    //   console.error("API Error:", error);
    //   // You can add more specific error handling here, e.g., displaying a message to the user.
    // },
    // onSuccess: onSuccessHandlerForReset,
    // onError: onErrorResponse,
  });
};