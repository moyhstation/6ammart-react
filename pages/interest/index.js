import React from "react";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import InterestOptions from "../../src/components/interest/InterestOptions";
import { getServerSideProps } from "../index";
import CustomContainer from "../../src/components/container";

const Index = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          <InterestOptions configData={configData} />
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Index;
Index.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;
export { getServerSideProps };
