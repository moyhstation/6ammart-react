import MainApi from "../../MainApi";
import { data_limit, moduleList, popular_items } from "../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { offset, type } = pageParams;
  const { data } = await MainApi.get(
    `${popular_items}?limit=${data_limit}&offset=${offset}&type=${type}`
  );
  return data;
};

export default function useGetPopularItemsNearby(pageParams) {
  return useQuery("popular-items-nearby", () => getData(pageParams), {
    enabled: false,
    cacheTime: 300000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: onErrorResponse,
  });
}
