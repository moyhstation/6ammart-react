import { useQuery } from "react-query";
import { channel_search_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const getSearched = async (searchedString) => {
  const { data } = await MainApi.get(
    `${channel_search_api}?name=${searchedString}&limit=20& offset=1`
  );
  return data;
};
export const useSearchList = (searchedString, handleSearchFetchOnSuccess) => {
  return useQuery("get_search_list", () => getSearched(searchedString), {
    enabled: false,
    onSuccess: handleSearchFetchOnSuccess,
  });
};
