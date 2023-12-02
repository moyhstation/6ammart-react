import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import { NoSsr, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useGetCategories from "../../src/api-manage/hooks/react-query/categories-details/useCategoriesDetails";
import useGetCategoriesForStore from "../../src/api-manage/hooks/react-query/categories-details/useCategoriesDetailsForStore";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../src/styled-components/CustomStyles.style";
import CategoriesDetails from "../../src/components/categories-details";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({ configData }) => {
  const [type, setType] = useState("all");
  const [offset, setOffset] = useState(1);
  const [page_limit, setPageLimit] = useState(10);
  const router = useRouter();
  const id = router.query.id.split("-")[0];
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
  }, [category_id, type, offset]);

  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Category` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <CustomStackFullWidth>
          <CustomPaperBigCard nopadding="true" sx={{ padding: "1rem" }}>
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
                itemIsLoading={itemIsLoading}
              />
            </NoSsr>
          </CustomPaperBigCard>
        </CustomStackFullWidth>
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
