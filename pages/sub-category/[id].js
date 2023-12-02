import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import { NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import useGetCategories from "../../src/api-manage/hooks/react-query/categories-details/useCategoriesDetails";
import useGetCategoriesForStore from "../../src/api-manage/hooks/react-query/categories-details/useCategoriesDetailsForStore";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../src/styled-components/CustomStyles.style";
import CategoriesDetails from "../../src/components/categories-details";
import { getServerSideProps } from "../index";
import SEO from "../../src/components/seo";
import CustomContainer from "../../src/components/container";

const Index = ({ configData, landingPageData }) => {
  const [type, setType] = useState("all");
  const [offset, setOffset] = useState(1);
  const [page_limit, setPageLimit] = useState(10);
  const router = useRouter();
  //const { id } = router.query;
  //SUBCATEGORY ID
  const id = router.query.id;

  const [category_id, setCategoryId] = useState(id);

  const {
    data,
    refetch,
    isRefetching,
    isLoading: itemIsLoading,
  } = useGetCategories({
    category_id,
    page_limit,
    offset,
    type,
  });

  const {
    data: storeData,
    refetch: storeRefetch,
    isLoading,
  } = useGetCategoriesForStore({
    category_id,
    page_limit,
    offset,
    type,
  });
  useEffect(() => {
    type && setOffset(1);
  }, [type]);
  useEffect(() => {
    refetch();
    storeRefetch();
  }, [category_id]);

  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? atob(router.query.name) : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomStackFullWidth mt="1rem">
          <CustomContainer>
            <CustomPaperBigCard sx={{ minHeight: "70vh" }}>
              <NoSsr>
                <CategoriesDetails
                  id={id}
                  data={data}
                  category_id={category_id}
                  setCategoryId={setCategoryId}
                  storeData={storeData}
                  offset={offset}
                  type={type}
                  setType={setType}
                  page_limit={page_limit}
                  setOffset={setOffset}
                  isLoading={isLoading}
                  isRefetching={isRefetching}
                  subCategory="true"
                  itemIsLoading={itemIsLoading}
                />
              </NoSsr>
            </CustomPaperBigCard>
          </CustomContainer>
        </CustomStackFullWidth>
      </MainLayout>
    </>
  );
};

export default Index;
export { getServerSideProps };
