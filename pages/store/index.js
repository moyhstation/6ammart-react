import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import StoresWithFilter from "../../src/components/home/stores-with-filter";
import {getServerSideProps} from "../index";
import SEO from "../../src/components/seo";

const AllStore = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Store` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <StoresWithFilter/>
            </MainLayout>
        </>
    );
};

export default AllStore;
export {getServerSideProps}
