import MainApi from "../../../MainApi";
import { user_info_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";
import { getToken } from "../../../../helper-functions/getToken";

const getData = async () => {
  const userToken = getToken();
  if (userToken) {
    const { data } = await MainApi.get(user_info_api);
    return data;
  }
};

export default function useGetUserInfo(handleSuccess) {
  return useQuery("user-info", () => getData(), {
    enabled: true,
    staleTime: 10000,
    cacheTime: 5000,
    onSuccess: handleSuccess,
    onError: onSingleErrorResponse,
  });
}
