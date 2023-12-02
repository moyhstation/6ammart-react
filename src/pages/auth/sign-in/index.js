import React from "react";

import MainLayout from "../../../src/components/layout/MainLayout";
import { CustomContainer } from "../../../src/components/footer/Footer.style";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../../meta-data";
import { NoSsr } from "@mui/material";
import dynamic from "next/dynamic";
import SignIn from "../../../src/components/auth/sign-in";
import {getServerSideProps} from "../../index";
import SEO from "../../../components/seo";

const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <SEO
        title={configData ? `Sign In` : "Loading..."}
        image={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
        businessName={configData?.business_name}
      />
      <MainLayout configData={configData}>
        <NoSsr>
          <SignIn configData={configData} />
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default index;

export {getServerSideProps}
