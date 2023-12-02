import React from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {NoSsr} from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import Wishlists from "../../src/components/wishlist";
import ZoneGuard from "../../components/route-guard/ZoneGuard";
import SEO from "../../components/seo";

import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Wishlist` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    <AuthGuard from={router.pathname.replace("/", "")}>
                        <ZoneGuard>
                            <Wishlists configData={configData} t={t}/>
                        </ZoneGuard>
                    </AuthGuard>
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default Index;

export {getServerSideProps}
