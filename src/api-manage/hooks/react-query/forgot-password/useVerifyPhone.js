import { useMutation } from "react-query";
import { verify_phone_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const sendOtp = async (otpData) => {
  const { data } = await MainApi.post(`${verify_phone_api}`, {
    phone: otpData?.phone,
    otp: otpData?.reset_token,
  });
  return data;
};
export const useVerifyPhone = () => {
  return useMutation("verify_phone_otp", sendOtp);
};
