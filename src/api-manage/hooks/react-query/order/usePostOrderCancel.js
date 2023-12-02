import MainApi from "../../../MainApi";
import { order_cancel_api, track_order_api } from "../../../ApiRoutes";
import { useMutation, useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const postData = async (formData) => {
  const { data } = await MainApi.post(order_cancel_api, formData);
  return data;
};

export default function usePostOrderCancel() {
  return useMutation("order-cancel", postData);
}
