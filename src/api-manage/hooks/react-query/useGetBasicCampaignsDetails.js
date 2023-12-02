import { basic_campaigns_details_api } from "../../ApiRoutes";
import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { id } = pageParams;
  const { data } = await MainApi.get(
    `${basic_campaigns_details_api}?basic_campaign_id=${id}`
  );
  return data;
};

export default function useGetBasicCampaignsDetails(pageParams) {
  return useQuery("basic-campaigns-details", () => getData(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
