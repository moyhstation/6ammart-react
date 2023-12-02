import MainApi from "../../../MainApi";
import { store_item_search_api } from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import axios from "axios";

const getData = async (pageParams) => {
  const { storeId, searchKey, offset, limit, type, moduleId, storeZoneId } =
    pageParams;
  if (getCurrentModuleType()) {
    const { data } = await MainApi.get(
      `${store_item_search_api}?store_id=${storeId}&name=${searchKey}&offset=${offset}&limit=${limit}&type=${type}`
    );
    return data;
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${store_item_search_api}?store_id=${storeId}&name=${searchKey}&offset=${offset}&limit=${limit}&type=${type}`,
      {
        headers: {
          "Content-Type": "application/json",
          zoneid: JSON.stringify(storeZoneId),
          moduleId: moduleId,
        },
      }
    );
    return data;
  }
};

export default function useGetSearchedStoreItems(
  pageParams,
  handleSearchSuccess
) {
  return useInfiniteQuery("searched-store-items", () => getData(pageParams), {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage?.products?.length > 0 ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
    retry: 3,
    enabled: false,
    onError: onSingleErrorResponse,
    cacheTime: "0",
  });
  // return useQuery("searched-store-items", () => getData(pageParams), {
  //   enabled: false,
  //   onSuccess: handleSearchSuccess,
  //   onError: onErrorResponse,
  // });
}
