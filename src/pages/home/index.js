import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import Router from "next/router";
import {setConfigData} from "../../src/redux/slices/configData";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Home = ({configData, landingPageData}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (configData) {
            if (configData.length === 0) {
                Router.push("/404");
            } else if (configData?.maintenance_mode) {
                Router.push("/maintainance");
            } else {
                dispatch(setConfigData(configData));
            }
        } else {
        }
    }, [configData]);
    return (
        <>
            <CssBaseline/>
            <SEO
                title={configData ? `Home` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <ModuleWiseLayout configData={configData}/>
            </MainLayout>
        </>
    );
};

export default Home;
Home.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;
export {getServerSideProps}
