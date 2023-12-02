import { useMutation } from "react-query";
import MainApi from "../../../MainApi";
import { cm_firebase_token_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const postHandler = async (token) => {
  const { data } = await MainApi.post(`${cm_firebase_token_api}`, {
    cm_firebase_token: token,
    _method: "put",
  });
  return data;
};
export const useStoreFcm = () => {
  return useMutation("fcm_token", postHandler, {
    onError: onSingleErrorResponse,
  });
};
