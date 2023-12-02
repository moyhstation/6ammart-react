import { useQuery } from "react-query";
import { common_condition_product_in_store } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import axios, { Axios } from "axios";

const getCommonConditionStoreProduct = async (params) => {
  const { id, moduleId, storeZoneId, offset, limit } = params;
  if (getCurrentModuleType()) {
    const { data } = await MainApi.get(`${common_condition_product_in_store}?store_id=${id}&offset=${offset}&limit=${limit}`);
    return data;
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${common_condition_product_in_store}/${id}`,
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

export default function useGetCommonConditionStore(params) {
  return useQuery(
    ["common-condition-store", params],
    () => getCommonConditionStoreProduct(params),
    {
      enabled: false,
      onError: onSingleErrorResponse,
    }
  );
}
