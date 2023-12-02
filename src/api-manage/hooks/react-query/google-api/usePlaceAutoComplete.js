import { useQuery } from "react-query";
import { placeApiAutocomplete_api } from "../../../ApiRoutes";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
const getAutocompletePlace = async (searchKey) => {
  if (searchKey && searchKey !== "") {
    const { data } = await MainApi.get(
      `${placeApiAutocomplete_api}?search_text=${searchKey}`
    );
    return data;
  }
};

export default function useGetAutocompletePlace(searchKey, enabled) {
  return useQuery(
    ["places", searchKey],
    () => getAutocompletePlace(searchKey),
    {
      enabled: enabled,
      onError: onSingleErrorResponse,
    }
  );
}
