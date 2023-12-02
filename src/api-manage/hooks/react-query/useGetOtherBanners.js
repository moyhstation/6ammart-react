import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";
import { others_banners } from "../../ApiRoutes";

const getOthersBanners = async () => {
  const { data } = await MainApi.get(others_banners);
  return data;
};

export default function useGetOtherBanners() {
  return useQuery("other-banners", getOthersBanners, {
    enabled: false,
    cacheTime: 300000,
    onError: onSingleErrorResponse,
  });
}
