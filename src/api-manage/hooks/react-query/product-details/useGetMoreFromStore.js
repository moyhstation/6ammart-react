import MainApi from "../../../MainApi";
import { latest_items_api, more_from_store } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { productId, offset, limit } =
    pageParams;
  const { data } = await MainApi.get(
    `${more_from_store}/${productId}?offset=${offset}&limit=${limit}`
  );
  return data;
};

export default function useGetMoreFromStores(pageParams, handleSuccess) {
  return useQuery("stores-categories-item", () => getData(pageParams), {
    enabled: false,
    onSuccess: handleSuccess,
    onError: onErrorResponse,
  });
}
