import { useQuery } from "react-query";

import { categories_api, subCategories_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (id, enable) => {
  const { data } = await MainApi.get(`${subCategories_api}/${id}`);
  return data;
};
export const useGetSubCategories = (id, enable) => {
  return useQuery(["get_subcategories_list", id], () => getData(id), {
    enabled: enable,
    //onSuccess: handleRequestOnSuccess,
    onError: onErrorResponse,
  });
};
