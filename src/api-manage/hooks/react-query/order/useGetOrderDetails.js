import MainApi from "../../../MainApi";
import {
  data_limit,
  my_orders_api,
  order_details_api,
} from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (order_id, guestId) => {
  const { data } = await MainApi.get(
    `${order_details_api}?order_id=${order_id}&guest_id=${guestId}`
  );
  return data;
};

export default function useGetOrderDetails(order_id, guestId) {
  return useQuery("order-details", () => getData(order_id, guestId), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
