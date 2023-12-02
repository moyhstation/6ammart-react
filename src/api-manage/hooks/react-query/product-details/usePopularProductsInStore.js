import { useQuery } from "react-query";
import { popular_items_in_store } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import axios, { Axios } from "axios";

const getPopularProductsInStore = async (params) => {
  const { id, moduleId, storeZoneId } = params;
  if (getCurrentModuleType()) {
    const { data } = await MainApi.get(`${popular_items_in_store}/${id}`);
    return data;
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${popular_items_in_store}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          zoneid: storeZoneId,
          moduleId: moduleId,
        },
      }
    );
    return data;
  }
};

export default function usePopularProductsInStore(params) {
  return useQuery(
    ["popular-store-items", params],
    () => getPopularProductsInStore(params),
    {
      enabled: false,
      onError: onSingleErrorResponse,
    }
  );
}
