import MainApi from "../../../MainApi";
import { Loyalty_points_transfer_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const postData = async (postData) => {
  const { data } = await MainApi.post(Loyalty_points_transfer_api, postData);
  return data;
};

export default function usePostLoyalityConvertValue() {
  return useMutation("post-loyalty-convert-value", postData);
}
