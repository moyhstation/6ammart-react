import MainApi from "../../../MainApi";
import { useInfiniteQuery } from "react-query";

import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getSearch = async (pageParams) => {
  const {
    currentTab: search_type,
    searchValue,
    offset,
    page_limit,
    pageParam,
  } = pageParams;
  const { data } = await MainApi.get(
    `/api/v1/${search_type}/search?name=${searchValue}&offset=${
      pageParam ? pageParam : offset
    }&limit=100`
  );
  return data;
};

export default function useGetSearch(pageParams) {
  return useInfiniteQuery(
    ["search-products", pageParams?.currentTab],
    ({ pageParam = 1 }) => getSearch({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return (pageParams?.currentTab === 1
          ? lastPage?.stores?.length
          : lastPage?.items?.length) > 0
          ? nextPage
          : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      retry: 3,
      enabled: false,
      onError: onSingleErrorResponse,
      cacheTime: "0",
    }
  );
}
