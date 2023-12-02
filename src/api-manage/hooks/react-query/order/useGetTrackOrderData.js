import MainApi from "../../../MainApi";
import { track_order_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";
import {getToken} from "../../../../helper-functions/getToken";

const getData = async (order_id, phone, guestId) => {
  const userToken=getToken()
  try {
    const params = !userToken
      ? `?order_id=${order_id}&guest_id=${guestId}&contact_number=${phone}`
      : `?order_id=${order_id}`;
    const { data } = await MainApi.get(`${track_order_api}${params}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export default function useGetTrackOrderData(
  order_id,
  phone,
  guestId,
  handleSuccess
) {
  return useQuery("track-order-data", () => getData(order_id, phone, guestId), {
    onSuccess: handleSuccess,
    enabled: false,
    retry: 1,
    onError: onErrorResponse,
  });
}
