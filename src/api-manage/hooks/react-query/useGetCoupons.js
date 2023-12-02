import MainApi from "../../MainApi";
import { useQuery } from "react-query";
import { coupon_list_api } from "../../ApiRoutes";

const getData = async () => {
  const { data } = await MainApi.get(coupon_list_api);
  return data;
};

export default function useGetCoupons() {
  return useQuery("coupons-list", getData, {
    enabled: false,
  });
}
