export const getFilteredData = (selectedFilters, data, currentTab) => {
  //item wise

  let newData = data;
  if (currentTab === 0) {
    selectedFilters?.forEach((item) => {
      if (item?.value === "discounted" && item?.checked) {
        newData = newData?.filter((item) => item?.discount >= 0);
      }
      if (item?.value === "popular" && item?.checked) {
        newData = newData?.sort((a, b) => b?.order_count - a?.order_count);
      }
      if (item?.value === "top_rated" && item?.checked) {
        newData = newData?.sort((a, b) => b?.rating_count - a?.rating_count);
      }
      if (item?.value === "ratings" && item?.checked) {
        newData = newData?.filter(
          (newItem) => newItem?.avg_rating >= item.rating
        );
      }
      if (item?.value === "price" && item?.checked) {
        newData = newData?.filter(
          (newItem) =>
            newItem?.price >= item.price[0] && newItem?.price <= item.price[1]
        );
      }
      if(item?.value==="from_campaign" && item?.checked){
        newData=newData?.filter((newItem)=>newItem?.is_campaign===1)
      }
    });
  }
  // store wise
  else {
    selectedFilters?.forEach((item) => {
      if (item?.value === "nearby" && item?.checked) {
        newData = newData?.sort((a, b) => a?.distance - b?.distance);
      }
      if (item?.value === "from_campaign" && item?.checked) {
        newData = newData?.filter((item) => item?.total_campaigns > 0);
      }
      if (item?.value === "currently_open" && item?.checked) {
        newData = newData?.filter((item) => item?.open > 0);
      }
      if (item?.value === "popular" && item?.checked) {
        newData = newData?.sort((a, b) => b?.order_count - a?.order_count);
      }
      if (item?.value === "top_rated" && item?.checked) {
        newData = newData?.sort((a, b) => b?.rating_count - a?.rating_count);
      }
      if (item?.value === "best_seller" && item?.checked) {
        newData = newData?.sort((a, b) => b?.order_count - a?.order_count);
      }
      if (item?.value === "ratings" && item?.checked) {
        newData = newData?.filter(
          (newItem) => newItem?.avg_rating >= item.rating
        );
      }
      if (item?.value === "discounted" && item?.checked) {
        newData = newData?.filter(
          (newItem) => newItem?.discount_status === true
        );
      }
    });
  }
  return newData;
};
