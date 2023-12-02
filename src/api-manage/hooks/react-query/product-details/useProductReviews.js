import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { product_reviews_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getProductReviews = async (pageParams) => {
  const { productId, page_limits, offSet } = pageParams;
  const { data } = await MainApi.get(
    `${product_reviews_api}/${productId}?limit=${page_limits}&offset=${offSet}`
  );
  return data;
};

export default function useGetProductReviews(pageParams) {
  return useQuery("product-reviews", () => getProductReviews(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
