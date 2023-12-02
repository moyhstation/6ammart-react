import { useQuery } from "react-query";

import { categories_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (searchKey) => {
  if (searchKey && searchKey !== "") {
    return await MainApi.get(`${categories_api}/${searchKey}`);
  } else {
    return await MainApi.get(`${categories_api}`);
  }
};
export const useGetCategories = (
  searchKey,
  handleRequestOnSuccess,
  queryKey
) => {
  return useQuery(
    queryKey ? queryKey : "catogories-list",
    () => getData(searchKey),
    {
      enabled: false,
      onSuccess: handleRequestOnSuccess,
      onError: onErrorResponse,
      cacheTime: 300000,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

const getFeaturedData = async () => {
  return await MainApi.get(`${categories_api}`);
};
export const useGetFeaturedCategories = () => {
  return useQuery("featured-categories-list", () => getFeaturedData(), {
    // enabled: false,
    staleTime: 1000 * 60 * 8,
    cacheTime: 1000 * 60 * 8,
    onError: onErrorResponse,
  });
};
