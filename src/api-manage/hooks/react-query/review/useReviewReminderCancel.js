import { cancel_last_item_review } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";

const getData = async (orderId) => {
  const { data } = await MainApi.get(
    `${cancel_last_item_review}?order_id=${orderId}`
  );
  return data;
};

export default function useReviewReminderCancel(reviewReminderCancel, orderId) {
  return useQuery("review-cancel", () => getData(orderId), {
    enabled: false,
    onSuccess: reviewReminderCancel,
    onError: onErrorResponse,
  });
}
