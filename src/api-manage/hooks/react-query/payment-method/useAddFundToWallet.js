import { useMutation } from "react-query";
import { add_fund_to_wallet } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";

const getAddFund = async (formData) => {
	const { data } = await MainApi.post(`${add_fund_to_wallet}`, formData);
	return data;
};
export const useAddFundToWallet = () => {
	return useMutation("add-fund-to-wallet", getAddFund);
};
