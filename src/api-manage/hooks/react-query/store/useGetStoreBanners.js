import { useQuery } from "react-query";

import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { banners } from "../../../ApiRoutes";

const getBanners = async (id) => {
  const { data } = await MainApi.get(`${banners}/${id}`);
  return data;
};

export default function useGetItemOrStore(id) {
  return useQuery("store-banners", () => getBanners(id), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
