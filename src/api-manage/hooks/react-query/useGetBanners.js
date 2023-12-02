import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";
import { banners } from "../../ApiRoutes";

const getBanners = async () => {
  const { data } = await MainApi.get(banners);
  return data;
};

export default function useGetBanners() {
  return useQuery("banners", getBanners, {
    enabled: false,
    cacheTime: 300000,
    onError: onSingleErrorResponse,
  });
}
