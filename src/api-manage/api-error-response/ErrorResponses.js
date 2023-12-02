import toast from "react-hot-toast";
import { t } from "i18next";
import Router from "next/router";

const handleTokenExpire = (item, status) => {
  if (status === 401) {
    if (window.localStorage.getItem("token")) {
      toast.error(t("Your token has been expired.please sign in again"));
      window?.localStorage.removeItem("token");
      Router.push("/auth/sign-in", undefined, { shallow: true });
    }
  } else {
    toast.error(item?.message, {
      id: "error",
    });
  }
};

export const onErrorResponse = (error) => {
  error?.response?.data?.errors?.forEach((item) => {
    handleTokenExpire(item);
  });
};
export const onSingleErrorResponse = (error) => {
  toast.error(error?.response?.data?.message, {
    id: "error",
  });
  handleTokenExpire(error, error?.response?.status);
};
