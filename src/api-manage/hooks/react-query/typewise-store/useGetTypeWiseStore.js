import MainApi from "../../../MainApi";
import { typewise_store_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";

const getData = async (storeType, type) => {
  const { data } = await MainApi.get(
    `${typewise_store_api}/${storeType}?type=${type}`
  );
  return data;
};

export default function useGetTypeWiseStore(storeType, type) {
  return useQuery("type-wise-store", () => getData(storeType, type), {
    enabled: false,
  });
}
