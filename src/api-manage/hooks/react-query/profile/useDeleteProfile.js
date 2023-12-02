import { useMutation } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";
import MainApi from "../../../MainApi";
import { remove_account_api } from "../../../ApiRoutes";

const deleteUserHandler = async () => {
  const { data } = await MainApi.delete(remove_account_api);
  return data;
};
export const useDeleteProfile = (onSuccessHandlerForUserDelete) => {
  return useMutation("profile-delete", deleteUserHandler, {
    onSuccess: onSuccessHandlerForUserDelete,
    onError: onErrorResponse,
  });
};
