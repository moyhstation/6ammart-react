import MainApi from "../../../MainApi";
import { profile_update_api } from "../../../ApiRoutes";
import { useMutation, useQuery } from "react-query";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const updateProfile = async (postData) => {
  const { data } = await MainApi.post(profile_update_api, postData);
  return data;
};

export default function useUpdateProfile() {
  return useMutation("update-profile", updateProfile);
}
