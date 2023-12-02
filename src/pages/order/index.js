import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import OrderSuccessPage from "../../src/components/order-success-page";
import CssBaseline from "@mui/material/CssBaseline";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const index = ({configData}) => {
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Order` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData}>
                <OrderSuccessPage configData={configData}/>
            </MainLayout>
        </>
    );
};

index.propTypes = {};

export default index;
export {getServerSideProps}
