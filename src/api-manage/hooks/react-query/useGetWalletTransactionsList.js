import { useQuery } from "react-query";
import { data_limit, wallet_transactions_list_api } from "../../ApiRoutes";
import MainApi from "../../MainApi";

const getData = async (pageParams) => {
	const { offset, type } = pageParams;
	const { data } = await MainApi.get(
		`${wallet_transactions_list_api}?offset=${offset}&limit=${data_limit}&type=${type}`
	);
	return data;
};

export default function useGetWalletTransactionsList(pageParams) {
	return useQuery(
		`wallet-transactions-list-${pageParams.type}`,
		() => getData(pageParams),
		{
			enabled: false,
		}
	);
}
