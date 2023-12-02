import React from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { onErrorResponse } from '../../api-error-response/ErrorResponses';
import MainApi from '../../MainApi';
import { flash_sales, flash_sales_items } from '../../ApiRoutes';

const getFlashSales = async(pageParams) => {
    const { limit, offset } = pageParams;
    const {data} = await MainApi.get(`${flash_sales}?limit=${limit}&offset${offset}`);
    return data;
}
export function useGetFlashSales(pageParams) {
  return useQuery("flash-sales", () => getFlashSales(pageParams), {
    enabled: false,
    onError: onErrorResponse,
  });
}

const getFlashSalesInfinity = async(pageParams) => {
    const { limit, offset,id } = pageParams;
    const pageParam = 1;
    const {data} = await MainApi.get(`${flash_sales_items}?limit=${limit}&offset=${offset}&flash_sale_id=${id}`);
    return data;
}

export function useGetFlashSalesInfinityScroll(pageParams) {
  return useInfiniteQuery(
    "flash-sales-items",
    ({ pageParam = 1 }) => getFlashSalesInfinity({ ...pageParams, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return (lastPage?.products?.length) > 0
          ? nextPage
          : undefined;
      },
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      enabled: false,
      onError: onErrorResponse,
      cacheTime: "0",
    }
  );
}