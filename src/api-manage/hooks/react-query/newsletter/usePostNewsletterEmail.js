import { useMutation } from "react-query";
import MainApi from "../../../MainApi";
import { subscribe_api } from "../../../ApiRoutes";

const postHandler = async (value) => {
  const { data } = await MainApi.post(subscribe_api, value);
  return data;
};
export const usePostNewsletterEmail = () => {
  return useMutation("newsletter_email", postHandler);
};
