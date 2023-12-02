import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TabsTypeOne from "../custom-tabs/TabsTypeOne";
import { t } from "i18next";
import useGetCategoriesChildes from "../../api-manage/hooks/react-query/categories-details/useGetCategoriesChildes";
import ItemNavigation from "./ItemNavigation";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ProductList from "../product-page/ProductList";
import CustomEmptyResult from "../custom-empty-result";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import noData from "../../../public/static/nodata.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { getModuleId } from "../../helper-functions/getModuleId";
import ProductCardShimmer from "../search/ProductCardShimmer";
import GroupButtons from "../GroupButtons";
import { getItemsOrFoods } from "../../helper-functions/getItemsOrFoods";
import { getStoresOrRestaurants } from "../../helper-functions/getStoresOrRestaurants";
import {
  not_found_text,
  not_found_text_item,
  not_found_text_store,
} from "../../utils/staticTexts";

const CategoriesDetails = ({
  data,
  id,
  category_id,
  setCategoryId,
  storeData,
  offset,
  page_limit,
  type,
  setOffset,
  isLoading,
  setType,
  subCategory,
  isRefetching,
  itemIsLoading,
}) => {
  const { selectedModule } = useSelector((state) => state.utilsData);
  const tabsData = [
    {
      title: getItemsOrFoods(),
      value: getItemsOrFoods(),
    },
    {
      title: getStoresOrRestaurants(),
      value: getStoresOrRestaurants(),
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabsData[0].value);
  const [categoryMenus, setCategoryMenus] = useState([]);
  const matches = useMediaQuery("(max-width:1180px)");
  const matchesXs = useMediaQuery("(max-width:480px)");
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const { data: childesData, refetch } = useGetCategoriesChildes({
    category_id,
  });

  useEffect(() => {
    if (subCategory !== "true") {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (id && childesData?.length > 0) {
      setCategoryMenus(childesData);
    }
    setCategoryId(id);
  }, [childesData, id]);
  return (
    <CustomStackFullWidth sx={{ minHeight: "70vh" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12} align="center" marginTop="20px">
          <TabsTypeOne
            tabs={tabsData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            t={t}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} align="center">
          {subCategory !== "true" && (
            <ItemNavigation
              categoryMenus={categoryMenus}
              setCategoryId={setCategoryId}
              category_id={category_id}
              id={id}
            />
          )}
        </Grid>
        {selectedModule?.module_type === "food" && (
          <Grid item xs={12} sm={12} md={12} align="center">
            <CustomStackFullWidth alignItems="center" justifyContent="center">
              <GroupButtons setType={setType} type={type} />
            </CustomStackFullWidth>
          </Grid>
        )}
        <Grid container item xs={12} sm={12} md={12} spacing={1}>
          {currentTab === getItemsOrFoods() &&
            (!isRefetching && !itemIsLoading ? (
              <>
                <ProductList
                  product_list={data}
                  offset={offset}
                  page_limit={page_limit}
                  setOffset={setOffset}
                  wishlistcard="true"
                />
                {data?.products?.length === 0 && (
                  <CustomEmptyResult
                    image={noData}
                    label={not_found_text_item}
                  />
                )}
              </>
            ) : (
              <ProductCardShimmer />
            ))}
          {currentTab === getStoresOrRestaurants() && (
            <>
              {storeData?.stores?.length > 0 &&
                !isLoading &&
                storeData?.stores?.map((item) => (
                  <Grid
                    item
                    md={matches ? 3 : 2.4}
                    sm={4}
                    xs={matchesXs ? 12 : 6}
                    key={item.id}
                  >
                    <StoresInfoCard data={item} />
                  </Grid>
                ))}

              {storeData?.stores?.length === 0 && (
                <CustomEmptyResult
                  label={not_found_text_store}
                  image={noData}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default CategoriesDetails;
