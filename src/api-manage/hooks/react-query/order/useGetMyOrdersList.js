import MainApi from "../../../MainApi";
import { data_limit, my_orders_api, popular_items } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { orderType, offset } = pageParams;
  const { data } = await MainApi.get(
    `${my_orders_api}/${orderType}?limit=${data_limit}&offset=${offset}`
  );
  return data;
};

export default function useGetMyOrdersList(pageParams) {
  return useQuery("my-orders-list", () => getData(pageParams), {
    staleTime: 60000,
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
