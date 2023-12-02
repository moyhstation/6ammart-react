import { useQuery } from 'react-query'
import MainApi from "../../MainApi";
const getBlog = async () => {
    const { data } = await MainApi.get(`/users`)
    return data
}

export default function useGetBlog() {
    return useQuery('blog', getBlog,{
        enabled:false
    })
}