import { useInfiniteQuery, useQuery } from "react-query";

import { popular_store_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getPopularStore = async (type) => {
  const { data } = await MainApi.get(`${popular_store_api}?type=${type}`);
  return data;
};
const getPopularStoreInfiniteScroll = async (pageParams) => {
  const { type, limit, offset, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${popular_store_api}?type=${type}&offset=${pageParam}&limit=${limit}`
  );
  return data;
};

export default function useGetPopularStore(pageParams) {
  return useInfiniteQuery(
    [pageParams?.searchKey, pageParams?.type],
    ({ pageParam = 1 }) =>
      getPopularStoreInfiniteScroll({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_size / pageParams?.limit;
        const nextPage = allPages.length + 1;
        return lastPage?.stores?.length > 0 ? nextPage : undefined;
      },
      retry: 1,
      enabled: false,
      onError: onErrorResponse,
    }
  );
}

export function useGetPopularStoreWithoutInfiniteScroll(pageParams) {
  return useQuery(
    [pageParams?.searchKey],
    ({ pageParam = pageParams.offset }) => getPopularStore(pageParams?.type),
    {
      enabled: false,
      onError: onErrorResponse,
    }
  );
}
