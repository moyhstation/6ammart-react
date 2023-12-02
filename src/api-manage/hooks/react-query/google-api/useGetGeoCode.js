import { useQuery } from "react-query";
import { geocode_api } from "../../../ApiRoutes";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
const getGeoCode = async (location) => {
  if (location) {
    const { data } = await MainApi.get(
      `${geocode_api}?lat=${location.lat}&lng=${location.lng}`
    );
    return data;
  }
};

export default function useGetGeoCode(location, geoLocationEnable) {
  return useQuery(["geo-code", location], () => getGeoCode(location), {
    enabled: true,
    //onError: onSingleErrorResponse,
  });
}
