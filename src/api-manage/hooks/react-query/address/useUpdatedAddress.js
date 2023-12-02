import MainApi from "../../../MainApi";
import {
  add_address_api,
  profile_update_api,
  update_address_api,
} from "../../../ApiRoutes";
import { useMutation } from "react-query";

const addData = async (postData) => {
  const { data } = await MainApi.put(
    `${update_address_api}/${postData?.id}`,
    postData
  );
  return data;
};

export default function useUpdatedAddress() {
  return useMutation("update-address", addData);
}
