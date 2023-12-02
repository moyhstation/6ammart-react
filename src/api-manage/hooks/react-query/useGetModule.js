import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { moduleList } from "../../ApiRoutes";
import { onErrorResponse } from "../../api-error-response/ErrorResponses";

const getModule = async () => {
  const { data } = await MainApi.get(moduleList);
  return data;
};

export default function useGetModule() {
  return useQuery("module-list", getModule, {
    enabled: false,
    onError: onErrorResponse,
  });
}
