import React from "react";
import { isAvailable } from "../../utils/CustomFunctions";

export const getFilterChoices = (filterData, data, currentTab) => {
  let productsList = currentTab === "items" ? data?.products : data?.stores;
  if (productsList && productsList?.length > 0) {
    if (filterData.rating !== "") {
      productsList = productsList.filter(
        (product) => product.avg_rating >= filterData?.rating
      );
    }
    if (!filterData?.filterBy.vag && filterData?.filterBy?.nonVeg) {
      productsList = productsList?.filter((product) => product.veg === 0);
    }
    if (!filterData?.filterBy?.nonVeg && filterData?.filterBy?.veg) {
      productsList = productsList?.filter((product) => product.veg === 1);
    }
    if (filterData?.filterBy?.currentAvailableFoods) {
      productsList = productsList?.filter((product) =>
        isAvailable(product.available_time_starts, product.available_time_ends)
      );
    }
    if (filterData.filterBy.discountedFoods) {
      productsList = productsList.filter(
        (product) => product.discount && product.discount !== 0
      );
    }
    if (filterData.price !== "") {
      productsList = productsList.filter(
        (product) =>
          product.price >= filterData.price[0] &&
          product.price <= filterData.price[1]
      );
    }
    if (filterData.sortBy !== "") {
      if (filterData.sortBy === "asc") {
        productsList = productsList.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
      }
      if (filterData.sortBy === "dsc") {
        productsList = productsList.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        );
      }
    }
  }

  return productsList;
};
