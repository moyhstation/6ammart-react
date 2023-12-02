import { useInfiniteQuery, useQuery } from "react-query";
import { new_arrivals } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getNewArrivals = async () => {
  const { data } = await MainApi.get(new_arrivals);
  return data;
};

export default function useNewArrivals() {
  return useQuery("new-arrivals", () => getNewArrivals(), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}

const getData = async (pageParams) => {
  const { limit, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${new_arrivals}?limit=${limit}&offset=${pageParam}`
  );
  return data;
};
export function useNewArrivalsInfiniteScroll(pageParams) {
  return useInfiniteQuery(
    ["new-arrivals-infinite", pageParams?.currentTab],
    ({ pageParam = 1 }) => getData({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.products?.length > 0 ? nextPage : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      retry: 3,
      enabled: false,
      onError: onSingleErrorResponse,
      cacheTime: "0",
    }
  );
}
