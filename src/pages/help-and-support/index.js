import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import HelpAndSupport from "../../src/components/help-and-support";
import {useTranslation} from "react-i18next";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Help and support` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />

            <MainLayout configData={configData} landingPageData={landingPageData}>
                <HelpAndSupport configData={configData} t={t}/>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
