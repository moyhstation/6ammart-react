import MainApi from "../../../MainApi";
import { delete_address_api } from "../../../ApiRoutes";
import { useMutation } from "react-query";

const deleteData = async (addressId) => {
  const { data } = await MainApi.delete(
    `${delete_address_api}?address_id=${addressId}`
  );
  return data;
};

export default function useDeleteAddress() {
  return useMutation("delete-address", deleteData);
}
