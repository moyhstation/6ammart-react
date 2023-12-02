import React from 'react'
import { useMutation, useQuery } from 'react-query'
import MainApi from '../../../MainApi'
import { onErrorResponse } from '../../../api-error-response/ErrorResponses';
import { offline_payment_options } from '../../../ApiRoutes';

const getOfflinePaymentOptions = async () => {
    const { data } = await MainApi.get(offline_payment_options);
    return data;
}
export default function useGetOfflinePaymentOptions() {
    return useQuery("offline-payments", getOfflinePaymentOptions, {
        enabled: false,
        onError: onErrorResponse
    });
}