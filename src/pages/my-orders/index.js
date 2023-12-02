import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import MyOrders from "../../src/components/my-orders";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import {useRouter} from "next/router";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({configData, landingPageData}) => {
    const router = useRouter();
    return (
        <>
            <SEO
                title={configData ? `My Orders` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />

            <CssBaseline/>
            <AuthGuard from={router.pathname.replace("/", "")}>
                <MainLayout configData={configData} landingPageData={landingPageData}>
                    <MyOrders configData={configData}/>
                </MainLayout>
            </AuthGuard>
        </>
    );
};

export default Index;
export {getServerSideProps}
