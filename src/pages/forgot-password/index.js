import React from "react";
import ForgotPassword from "../../src/components/auth/ForgotPassword/ForgotPassword";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Forgot password` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <ForgotPassword/>
            </MainLayout>
        </>
    );
};

export default index;
export {getServerSideProps}
