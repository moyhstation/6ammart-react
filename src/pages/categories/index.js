import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import Categories from "../../src/components/categories";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Categories` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />

            <MainLayout configData={configData} landingPageData={landingPageData}>
                <Categories configData={configData} t={t}/>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
