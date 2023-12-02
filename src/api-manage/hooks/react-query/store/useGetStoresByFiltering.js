import MainApi from "../../../MainApi";
import { filtered_stores_api } from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { offset, limit, type, pageParam } = pageParams;
  const { data } = await MainApi.get(
    `${filtered_stores_api}/${
      type === "take away" ? "take_away" : type
    }?offset=${pageParam}&limit=${limit}`
  );
  return data;
};

export default function useGetStoresByFiltering(pageParams) {
  const { offset, limit, type } = pageParams;
  return useInfiniteQuery(
    ["all stores", type, pageParams?.currentTab],
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

export function useGetStoresWithoutInfiniteScroll(pageParams) {
  const { offset, limit, type } = pageParams;
  return useQuery([offset, limit, type], () => getData(pageParams), {
    enabled: false,
    onError: onErrorResponse,
    cacheTime: "0",
  });
}

// export  function useGetStoresByFiltering(pageParams) {
//     const { offset, limit, type } = pageParams;
//     return useInfiniteQuery(
//         [offset, limit, type],
//         ({ pageParam = offset }) => getData(pageParams),
//         {
//             getNextPageParam: (lastPage, allPages) => {
//                 const nextPage = allPages.length + 1;
//                 return lastPage?.stores?.length > 0 ? nextPage : undefined;
//             },
//             getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
//             enabled: false,
//             onError: onErrorResponse,
//             cacheTime: "0",
//         }
//     );
// }
