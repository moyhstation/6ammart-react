import MainApi from "../../MainApi";
import { categories_details_api } from "../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { categoryId, page_limit, offset, type } = pageParams;
  const { data } = await MainApi.get(
    `${categories_details_api}/${categoryId}?limit=${page_limit}&offset=${offset}&type=${type}`
  );
  return data;
};

export default function useGetFeatureCategoriesProducts(pageParams) {
  return useQuery("categories-details", () => getData(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
