import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";
import { basic_campaigns_api } from "../../ApiRoutes";

const getData = async () => {
  const { data } = await MainApi.get(basic_campaigns_api);
  return data;
};

export default function useGetBasicCampaigns() {
  return useQuery("basic-cam", getData, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
