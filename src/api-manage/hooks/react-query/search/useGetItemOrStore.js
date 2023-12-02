import MainApi from "../../../MainApi";
import {
  suggested_items_stores,
  suggestedProducts_api,
} from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (key) => {
  if (key !== "") {
    const { data } = await MainApi.get(`${suggested_items_stores}?name=${key}`);
    return data;
  }
};

export default function useGetItemOrStore(key) {
  return useQuery("item-and-store-suggestions", () => getData(key), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
