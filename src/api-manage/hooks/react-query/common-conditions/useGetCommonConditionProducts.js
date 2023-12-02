import { useQuery } from "react-query"
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses"
import { common_conditions_product_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const getData = async (pageParams) =>{
    const { conditionId, page_limit, offset} = pageParams;
    const {data} = await MainApi.get(
        `${common_conditions_product_api}/${conditionId}?limit=${page_limit}&offset=${offset}`
    );
    return data;
}

export default function useGetCommonConditionProducts(pageParams) {
    return useQuery("common-condition-products", () =>getData(pageParams),{
        enabled : false,
        onError: onSingleErrorResponse,
    });
}