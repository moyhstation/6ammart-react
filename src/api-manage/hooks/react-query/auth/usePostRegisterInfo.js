import { useMutation } from "react-query";
import { social_register_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const postHandler = async (info) => {
  const { data } = await MainApi.post(`${social_register_api}`, info);
  return data;
};
export const usePostRegisterInfo = () => {
  return useMutation("info_post_request", postHandler);
};
