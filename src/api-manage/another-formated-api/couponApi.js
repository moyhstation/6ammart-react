import MainApi from "../MainApi";

export const CouponApi = {
  couponList: () => MainApi.get("/api/v1/coupon/list"),
  applyCoupon: (code, store_id) =>
    MainApi.get(`/api/v1/coupon/apply?code=${code}&store_id=${store_id}`),
};
