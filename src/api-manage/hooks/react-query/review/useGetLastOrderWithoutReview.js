import { last_item_review } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";

const getData = async (id) => {
  const { data } = await MainApi.get(`${last_item_review}`);
  return data;
};

export default function useGetLastOrderWithoutReview(reviewReminder) {
  return useQuery("review", () => getData(), {
    enabled: false,
    onSuccess: reviewReminder,
    onError: onSingleErrorResponse,
  });
}
