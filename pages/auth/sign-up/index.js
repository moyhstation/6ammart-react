import React from "react";
import MainLayout from "../../../src/components/layout/MainLayout";

import CssBaseline from "@mui/material/CssBaseline";
import dynamic from "next/dynamic";
import {getServerSideProps} from "../../index";
import SEO from "../../../src/components/seo";

const index = ({configData, landingPageData}) => {
    const SignUp = dynamic(
        () => import("../../../src/components/auth/sign-up/SignUp"),
        {
            ssr: false,
        }
    );
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Sign Up` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData}>
                <SignUp/>
            </MainLayout>
        </>
    );
};

export default index;

export {getServerSideProps}
