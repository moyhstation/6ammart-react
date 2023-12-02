import { useMutation } from "react-query";
import MainApi from "../../../MainApi";
import { update_interest_api } from "../../../ApiRoutes";

const postHandle = async (values) => {
  const { data } = await MainApi.post(update_interest_api, values);
  return data;
};

export const usePostSelectedCategory = () => {
  return useMutation("store_selected_category", postHandle);
};
