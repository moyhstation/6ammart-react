import MainApi from "../../../MainApi";
import { new_arrival_stores_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { offset, type } = pageParams;
  
  const { data } = await MainApi.get(`${new_arrival_stores_api}?type=${type}`);
  return data;
};

export default function useGetNewArrivalStores(pageParams) {
  return useQuery("new-arrival-stores", () => getData(pageParams), {
    enabled: false,
    onError: onErrorResponse,
  });
}
