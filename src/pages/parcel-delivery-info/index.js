import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import PercelDelivery from "../../src/components/parcel/parcel-delivery-info-component/ParcelDelivary";
import CssBaseline from "@mui/material/CssBaseline";
import {NoSsr} from "@mui/material";
import {getServerSideProps} from "../index";
import SEO from "../../components/seo";

const Index = ({configData}) => {
    return (<>
            <CssBaseline/>
            <SEO
                title={configData ? `Parcel Deliver information` : "Loading..."}
                image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                businessName={configData?.business_name}
            />
            <MainLayout configData={configData}>
                <NoSsr>
                    <PercelDelivery configData={configData}/>
                </NoSsr>
            </MainLayout>
        </>);
};

export default Index;
export {getServerSideProps}
