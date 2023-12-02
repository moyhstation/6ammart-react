import { useMutation } from "react-query";
import MainApi from "../../../MainApi";

const resetPassword = async (newPass) => {
  const { data } = await MainApi.put("/api/v1/auth/reset-password", newPass);
  return data;
};
export const useResetPassword = (onSuccessHandlerForReset, onErrorResponse) => {
  return useMutation("reset_password", resetPassword, {
    onSuccess: onSuccessHandlerForReset,
    onError: onErrorResponse,
  });
};
