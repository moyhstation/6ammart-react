import { useQuery } from "react-query";

import MainApi from "../../../MainApi";
import { get_channel_list } from "../../../ApiRoutes";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async () => {
  const { data } = await MainApi.get(`${get_channel_list}`);
  return data;
};
export const useGetChannelList = (handleRequestOnSuccess) => {
  return useQuery("get_channel_list", () => getData(), {
    enabled: false,
    onSuccess: handleRequestOnSuccess,
    onError: onErrorResponse,
  });
};
