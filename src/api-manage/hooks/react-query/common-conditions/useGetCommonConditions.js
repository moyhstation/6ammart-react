import { useQuery } from "react-query"
import { onErrorResponse } from "../../../api-error-response/ErrorResponses"
import MainApi from "../../../MainApi"
import { common_condition_api } from "../../../ApiRoutes"

const getConditionsData = async() =>{
    return await MainApi.get(`${common_condition_api}`)
}

export const useGetCommonConditions = () =>{
    return useQuery("common-condition", () => getConditionsData(), {
        staleTime: 1000 * 60 * 8,
        cacheTime: 1000 * 60 * 8,
        onError: onErrorResponse,
    });
}