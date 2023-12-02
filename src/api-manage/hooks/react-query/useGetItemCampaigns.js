import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { onSingleErrorResponse } from "../../api-error-response/ErrorResponses";
import { campaigns_item } from "../../ApiRoutes";

const getData = async () => {
  const { data } = await MainApi.get(campaigns_item);
  return data;
};

export default function useGetItemCampaigns() {
  return useQuery("item-campaigns", getData, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
