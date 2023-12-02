import MainApi from "../../MainApi";
import {data_limit, most_reviewed_items_api, popular_items} from "../../ApiRoutes";
import {useQuery} from "react-query";
import {onErrorResponse} from "../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
    const {offset, type} = pageParams
    const { data } = await MainApi.get(`${most_reviewed_items_api}?type=${type}`)
    return data
}

export default function useGetMostReviewed(pageParams) {
    return useQuery('best-reviewed-items',()=> getData(pageParams),{
        enabled:false,
        onError:onErrorResponse,
    })
}