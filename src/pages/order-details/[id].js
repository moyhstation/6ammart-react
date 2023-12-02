import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import React from "react";
import ParcelOrder from "../../src/components/my-orders/order-details/parcel-order/ParcelOrder";
import OtherOrder from "../../src/components/my-orders/order-details/other-order";
import { useRouter } from "next/router";
import OrderDetails from "../../src/components/my-orders/order-details";
import SEO from "../../components/seo";

import {getServerSideProps} from "../index";
const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Order details` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <OrderDetails configData={configData} />
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
