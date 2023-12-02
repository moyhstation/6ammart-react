import { useMutation } from "react-query";
import MainApi from "../../../MainApi";

const offlinePayment = async (offlineInfo) => {
  const { data } = await MainApi.put("/api/v1/customer/order/offline-payment", offlineInfo);
  return data;
};

export const useOfflinePayment = () => {
  return useMutation("offline_method", (offlinePaymentData) => offlinePayment(offlinePaymentData), {
    // onError: (error) => {
    //   console.error("API Error:", error);
    //   // You can add more specific error handling here, e.g., displaying a message to the user.
    // },
    // onSuccess: onSuccessHandlerForReset,
    // onError: onErrorResponse,
  });
};