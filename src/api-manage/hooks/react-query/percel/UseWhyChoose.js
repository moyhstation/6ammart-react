import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { parcel_whyChoose_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getWhyChoose = async () => {
  const { data } = await MainApi.get(parcel_whyChoose_api);
  return data;
};

export default function useWhyChoose() {
  return useQuery("why-choose", getWhyChoose, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}