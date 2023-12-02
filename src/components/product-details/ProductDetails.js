import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, NoSsr } from "@mui/material";
import ProductDetailsSection from "./product-details-section/ProductDetailsSection";

import StoreDetails from "./StoreDetails";
import ProductsMoreFromTheStore from "./ProductsMoreFromTheStore";
import FeaturedStores from "../home/module-wise-components/pharmacy/featured-stores";

import DetailsAndReviews from "./details-and-reviews/DetailsAndReviews";
import LoveItem from "../home/love-item";
import DiscountedProductRedirectBanner from "../home/DiscountedProductRedirectBanner";
import SinglePoster from "../home/module-wise-components/ecommerce/SinglePoster";

const ProductDetails = ({ productDetailsData, configData }) => {
  const storeImageBaseUrl = configData?.base_urls?.store_image_url;
  return (
    <CustomStackFullWidth
      spacing={5}
      paddingTop={{ xs: "1.25rem", md: "2.5rem" }}
      paddingBottom="2.5rem"
      sx={{ minHeight: "100vh" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CustomStackFullWidth spacing={5}>
            <ProductDetailsSection
              productDetailsData={productDetailsData}
              configData={configData}
            />
            <DetailsAndReviews
              configData={configData}
              description={productDetailsData?.description}
              reviews={productDetailsData?.reviews}
              productId={productDetailsData?.id}
            />
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomStackFullWidth spacing={3}>
            <StoreDetails
              storeDetails={productDetailsData?.store_details}
              storeImageBaseUrl={storeImageBaseUrl}
            />
            <ProductsMoreFromTheStore productDetails={productDetailsData} />
          </CustomStackFullWidth>
        </Grid>

        {/*<Grid item xs={12}>*/}
        {/*  <LoveItem />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <SinglePoster  />
        </Grid>
        <Grid item xs={12}>
          <FeaturedStores title="Popular Store" configData={configData} />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <DiscountedProductRedirectBanner />*/}
        {/*</Grid>*/}
      </Grid>

      {/*{productDetailsData && !productDetailsData?.isCampaignItem && (*/}
      {/*  <>*/}
      {/*    /!*<ProductReviews productDetailsId={productDetailsData?.id} />*!/*/}
      {/*    /!*<NoSsr>*!/*/}
      {/*    /!*  <MoreFromStore productDetails={productDetailsData} />*!/*/}
      {/*    /!*</NoSsr>*!/*/}
      {/*    /!*<SimilarProducts productId={productDetailsData?.id} />*!/*/}
      {/*  </>*/}
      {/*)}*/}
    </CustomStackFullWidth>
  );
};

export default ProductDetails;
