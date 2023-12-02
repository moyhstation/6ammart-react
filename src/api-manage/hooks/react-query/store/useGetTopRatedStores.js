import MainApi from "../../../MainApi";
import { filtered_stores_api, top_rated_stores } from "../../../ApiRoutes";
import { useInfiniteQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { offset, limit, type, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${top_rated_stores}?offset=${pageParam}&limit=${limit}&type=${type}`
  );
  return data;
};

export default function useGetTopRatedStores(pageParams) {
  const { offset, limit, type } = pageParams;
  return useInfiniteQuery(
    ["top rated stores", type],
    ({ pageParam = 1 }) => getData({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.stores?.length > 0 ? nextPage : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      enabled: false,
      onError: onErrorResponse,
      cacheTime: "0",
    }
  );
}
