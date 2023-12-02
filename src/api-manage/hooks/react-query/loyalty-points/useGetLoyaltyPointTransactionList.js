import MainApi from "../../../MainApi";
import { data_limit, LP_transactions_list_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";

const getData = async (pageParams) => {
  const { offset } = pageParams;
  const { data } = await MainApi.get(
    `${LP_transactions_list_api}?offset=${offset}&limit=${data_limit}`
  );
  return data;
};

export default function useGetLoyaltyPointTransactionsList(pageParams) {
  return useQuery(
    "loyalty-point-transactions-list",
    () => getData(pageParams),
    {
      enabled: false,
    }
  );
}
