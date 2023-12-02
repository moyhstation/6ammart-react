import React from "react";
import SignIn from "../../../src/components/auth/sign-in";
import MainLayout from "../../../src/components/layout/MainLayout";
import { CustomContainer } from "../../../src/components/footer/Footer.style";
import {getServerSideProps} from "../../index";
import CssBaseline from "@mui/material/CssBaseline";
import isHover from "../../meta-data";
import dynamic from "next/dynamic";
import SEO from "../../../components/seo";

const index = ({ configData }) => {
  const SignUp = dynamic(
    () => import("../../../src/components/auth/sign-up/SignUp"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <CssBaseline />
      <SEO title={`Sign Up - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <SignUp />
      </MainLayout>
    </>
  );
};

export default index;

export {getServerSideProps}
