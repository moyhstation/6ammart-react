import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import CampaignsPage from "../../src/components/Campaigns";
import {getServerSideProps} from '../index'
import SEO from "../../src/components/seo";

const Index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Campaigns` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <CampaignsPage/>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
