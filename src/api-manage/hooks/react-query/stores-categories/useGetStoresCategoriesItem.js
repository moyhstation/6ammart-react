import MainApi from "../../../MainApi";
import { latest_items_api } from "../../../ApiRoutes";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import axios from "axios";

const getData = async (pageParams) => {
  const {
    storeId,
    categoryId: categoryIdEr,
    offset,
    type,
    limit,
    minMax,
    moduleId,
    storeZoneId,
  } = pageParams;
  const categoryId = categoryIdEr?.length === 0 ? [0] : categoryIdEr;
  if (getCurrentModuleType()) {
    if (minMax[0] !== 0 && minMax[1] !== 1) {
      const { data } = await MainApi.get(
        `${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}&min_price=${minMax[0]}&max_price=${minMax[1]}`
      );
      return data;
    } else {
      const { data } = await MainApi.get(
        `${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}`
      );
      return data;
    }
  } else {
    if (minMax[0] !== 0 && minMax[1] !== 1) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}&min_price=${minMax[0]}&max_price=${minMax[1]}`,
        {
          headers: {
            "Content-Type": "application/json",
            zoneid: JSON.stringify(storeZoneId),
            moduleId: moduleId,
          },
        }
      );
      return data;
    } else {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}`,
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
  }
};

export default function useGetStoresCategoriesItem(pageParams, handleSuccess) {
  return useInfiniteQuery("stores-categories-item", () => getData(pageParams), {
    // enabled: false,
    // onSuccess: handleSuccess,
    // onError: onErrorResponse,
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
}
