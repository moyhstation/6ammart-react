import { useQuery } from "react-query";
import { distance_api } from "../../../ApiRoutes";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
const getDistance = async (origin, destination) => {
  const { data } = await MainApi.get(
    `${distance_api}?origin_lat=${origin?.lat}&origin_lng=${
      origin?.lng
    }&destination_lat=${
      destination.lat ? destination.lat : destination?.latitude
    }&destination_lng=${
      destination.lng ? destination.lng : destination?.longitude
    }&mode=walking`
  );
  return data;
};

export default function useGetDistance(origin, destination) {
  return useQuery(
    ["distance", origin, destination],
    () => getDistance(origin, destination),
    {
      enabled: false,
      onError: onSingleErrorResponse,
    }
  );
}
