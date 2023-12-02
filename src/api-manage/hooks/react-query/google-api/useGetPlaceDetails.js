import { useQuery } from "react-query";
import { placedetails_api } from "../../../ApiRoutes";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
const getPlaceDetails = async (placeId) => {
  if (placeId) {
    const { data } = await MainApi.get(
      `${placedetails_api}?placeid=${placeId}`
    );
    return data;
  }
};

export default function useGetPlaceDetails(
  placeId,
  placeDetailsEnabled,
  successHandler
) {
  return useQuery(["placeDetails", placeId], () => getPlaceDetails(placeId), {
    enabled: placeDetailsEnabled,
    onSuccess: successHandler,
    onError: onSingleErrorResponse,
  });
}
