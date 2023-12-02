import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { latest_store_api } from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import MainApi from "../../../MainApi";

const getLatestStore = async () => {
  const { data } = await MainApi.get(latest_store_api);
  return data;
};
const getLatestStoreWithParams = async (pageParams) => {
  const { type, offset, limit, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${latest_store_api}?limit=${limit}&offset=${pageParam}&type=${type}`
  );
  return data;
};

export default function useGetLatestStore() {
  return useQuery("latest-store", getLatestStore, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}

export function useGetLatestStoreByInfiniteStore(pageParams) {
  return useInfiniteQuery(
    ["latest-store", pageParams.type],
    ({ pageParam = 1 }) =>
      getLatestStoreWithParams({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.stores?.length > 0 ? nextPage : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      retry: 3,
      enabled: false,
      onError: onSingleErrorResponse,
      cacheTime: "0",
    }
  );
}
