import { useQuery } from "react-query";
import { wallet_bonuses } from "../../ApiRoutes";
import MainApi from "../../MainApi";
const getWalletBonus = async () => {
	const { data } = await MainApi.get(wallet_bonuses);
	return data;
};

export default function useWalletBonus() {
	return useQuery("wallet_bonus", getWalletBonus, {
		enabled: false,
	});
}
