import MainApi from "../../../MainApi";
import { address_list_api, moduleList } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";
import {getToken} from "../../../../helper-functions/getToken";

const getData = async () => {
  const userToken=getToken()
  if(userToken){
    const { data } = await MainApi.get(address_list_api);
    return data;
  }

};

export default function useGetAddressList(handleSuccess) {
  return useQuery("address-list", getData, {
    onSuccess: handleSuccess,
    enabled: false,
    onError: onErrorResponse,
  });
}
