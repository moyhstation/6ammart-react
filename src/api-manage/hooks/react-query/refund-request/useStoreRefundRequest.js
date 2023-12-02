import { useMutation } from 'react-query'
import MainApi from "../../../MainApi";


const postHandler = async ({customer_reason,identity_image,id,customer_note}) => {
    let formData = new FormData()
    formData.append('customer_reason', customer_reason)
    formData.append("customer_note",customer_note)
    formData.append('order_id',id)
    identity_image.forEach((file) => {
        formData.append("image[]", file);
    })
    const { data } = await MainApi.post('/api/v1/customer/order/refund-request', formData)
    return data
}
export const useStoreRefundRequest = () => {
    return useMutation('refund_request', postHandler)
}