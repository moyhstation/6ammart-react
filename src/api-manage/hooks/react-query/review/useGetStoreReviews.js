import {
  order_details_api,
  store_review_api,
  track_order_api,
} from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";

const getData = async (id) => {
  const { data } = await MainApi.get(`${store_review_api}?store_id=${id}`);
  return data;
};

export default function useGetStoreReviews(id) {
  return useQuery("track-order-data", () => getData(id), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
