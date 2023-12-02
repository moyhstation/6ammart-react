import { useQuery } from "react-query";
import { zoneId_api } from "../../../ApiRoutes";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
const getZoneId = async (location, zoneIdEnabled) => {
  if (location?.lat && location?.lng) {
    const { data } = await MainApi.get(
      `${zoneId_api}?lat=${location?.lat}&lng=${location?.lng}`
    );
    return data;
  }
};

export default function useGetZoneId(location, zoneIdEnabled) {
  return useQuery(["zoneId", location], () => getZoneId(location), {
    enabled: zoneIdEnabled,
    onError: onErrorResponse,
  });
}
