import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import React from "react";
import OrderDetails from "../../src/components/my-orders/order-details";
import SEO from "../../src/components/seo";
import {getServerSideProps} from "../index";

const index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Order details` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <OrderDetails configData={configData}/>
            </MainLayout>
        </>
    );
};

export default index;
export {getServerSideProps}
