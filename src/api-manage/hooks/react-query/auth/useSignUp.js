import { useMutation } from "react-query";
import { signUp_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const userSignUp = async (signUpData) => {
  const { data } = await MainApi.post(`${signUp_api}`, signUpData);
  return data;
};
export const useSignUp = () => {
  return useMutation("sign-up", userSignUp);
};
