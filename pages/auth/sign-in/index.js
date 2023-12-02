import React, {useEffect, useState} from "react";
import MainLayout from "../../../src/components/layout/MainLayout";
import CssBaseline from "@mui/material/CssBaseline";
import {NoSsr} from "@mui/material";
import SignIn from "../../../src/components/auth/sign-in";
import SEO from "../../../src/components/seo";
import {getServerSideProps} from "../../index";
import {useRouter} from "next/router";

const Index = ({configData, landingPageData}) => {
    const [token, setToken] = useState(null)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            router.push('/home')
        }
    }, [])
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Sign In` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    {!token && <SignIn configData={configData}/>}
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default Index;

export {getServerSideProps}
