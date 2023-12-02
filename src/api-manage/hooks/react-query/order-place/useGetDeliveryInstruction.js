import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { parcel_delivery_instructions } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getDeliveryInstruction = async () => {
  const { data } = await MainApi.get(parcel_delivery_instructions);
  return data;
};

export default function useGetDeliveryInstruction() {
  return useQuery("parcel-category", getDeliveryInstruction, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
