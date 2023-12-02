import { useMutation } from "react-query";
import { social_login_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const postHandler = async (email) => {

  const { data } = await MainApi.post(`${social_login_api}`, email);
  return data;
};
export const usePostEmail = () => {
  return useMutation("email_post_request", postHandler);
};
