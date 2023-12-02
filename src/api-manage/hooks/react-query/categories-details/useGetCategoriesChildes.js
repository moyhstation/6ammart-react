import MainApi from "../../../MainApi";
import {
  categories_Childes_api,
  categories_details_api,
  data_limit,
  my_orders_api,
  popular_items,
} from "../../../ApiRoutes";
import { useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { category_id } = pageParams;
  const { data } = await MainApi.get(
    `${categories_Childes_api}/${category_id}`
  );
  return data;
};

export default function useGetCategoriesChildes(pageParams) {
  return useQuery("categories-details-Childes", () => getData(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
