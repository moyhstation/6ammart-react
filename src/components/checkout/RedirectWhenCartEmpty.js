import { useEffect } from "react";
import { useRouter } from "next/router";

const RedirectWhenCartEmpty = ({
  page,
  cartList,
  campaignItemList,
  buyNowItemList,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (cartList?.length === 0 && page === "cart") {
      router.push("/home");
    } else if (campaignItemList?.length === 0 && page === "campaign") {
      router.push("/home");
    } else {
      if (buyNowItemList?.length === 0 && page === "campaign") {
        router.push("/home");
      }
    }
  }, [cartList, page, router, campaignItemList, buyNowItemList]);

  return null;
};

export default RedirectWhenCartEmpty;
