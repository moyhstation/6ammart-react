import {useTranslation} from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {NoSsr} from "@mui/material";
import UserLayout from "../../src/components/layout/UserLayout";
import React from "react";
import LoyaltyPoints from "../../src/components/loyalty-points";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import {useRouter} from "next/router";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({configData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Loyalty points` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData}>
                <NoSsr>
                    <AuthGuard from={router.pathname.replace("/", "")}>
                        <UserLayout
                            component={<LoyaltyPoints configData={configData} t={t}/>}
                            configData={configData}
                            t={t}
                        />
                    </AuthGuard>
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
