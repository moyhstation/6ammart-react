import { useMutation } from "react-query";
import MainApi from "../../../MainApi";

const forgotPassword = async (phone) => {
  const { data } = await MainApi.post("/api/v1/auth/forgot-password", phone);
  return data;
};
export const useForgotPassword = ({
  onSuccessHandlerForForgotpass,
  onErrorResponse,
}) => {
  return useMutation("forgot_password", forgotPassword, {
    onSuccess: onSuccessHandlerForForgotpass,
    onError: onErrorResponse,
  });
};
