import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { parcel_category_api, similar_product_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getSimilarProduct = async (id) => {
  const { data } = await MainApi.get(`${similar_product_api}/${id}`);
  return data;
};

export default function useGetSimilarProduct(id) {
  return useQuery(["similar-product", id], () => getSimilarProduct(id), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
