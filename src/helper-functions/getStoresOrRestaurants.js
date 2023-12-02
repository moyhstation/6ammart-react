import {t} from "i18next";

export const getStoresOrRestaurants = () => {
  if (typeof window !== "undefined") {
    if (
      JSON.parse(window.localStorage.getItem("module"))?.module_type === "food"
    ) {
      return t("Restaurants");
    } else {
      return t("Stores");
    }
  }
};
