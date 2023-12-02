import MainApi from "../../MainApi";

export const GoogleApi = {
  placeApiAutocomplete: (search) => {
    if (search && search !== "") {
      return MainApi.get(
        `/api/v1/config/place-api-autocomplete?search_text=${search}`
      );
    }
  },
  placeApiDetails: (placeId) => {
    return MainApi.get(`/api/v1/config/place-api-details?placeid=${placeId}`);
  },
  getZoneId: (location) => {
    return MainApi.get(
      `/api/v1/config/get-zone-id?lat=${location.lat}&lng=${location.lng}`
    );
  },
  distanceApi: (origin, destination) => {
    return MainApi.get(
      `/api/v1/config/distance-api?origin_lat=${origin.latitude}&origin_lng=${
        origin.longitude
      }&destination_lat=${
        destination.lat ? destination.lat : destination?.latitude
      }&destination_lng=${
        destination.lng ? destination.lng : destination?.longitude
      }&mode=walking`
    );
  },
  geoCodeApi: (location) => {
    return MainApi.get(
      `/api/v1/config/geocode-api?lat=${location.lat}&lng=${location.lng}`
    );
  },
};
