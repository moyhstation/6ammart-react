import MainApi from "../../../MainApi";
import {
  categories_details_api,
  categories_details_Store_api,
  data_limit,
  my_orders_api,
  popular_items,
} from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const {
    category_id,
    selectedCategoriesIds,
    page_limit,
    offset,
    type,
    pageParam,
  } = pageParams;
  const selectedCategoriesId = JSON.stringify(selectedCategoriesIds);
  const { data } = await MainApi.get(
    `${categories_details_Store_api}/list?limit=${page_limit}&offset=${
      pageParam ? pageParam : offset
    }&type=${type}&category_ids=${selectedCategoriesId}`
  );
  return data;
};

export default function useGetCategoriesForStore(pageParams) {
  return useInfiniteQuery(
    "categories-details-stores",
    ({ pageParam = 1 }) => getData({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return (lastPage?.stores?.length || lastPage?.products?.length) > 0
          ? nextPage
          : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      enabled: false,
      onError: onErrorResponse,
      cacheTime: "0",
    }
  );
}
