import MainApi from "../../../MainApi";
import { store_details_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (store_id) => {
  if (store_id) {
    const { data } = await MainApi.get(`${store_details_api}/${store_id}`);
    return data;
  }
};

export default function useGetStoreDetails(store_id) {
  return useQuery("store-details", () => getData(store_id), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
