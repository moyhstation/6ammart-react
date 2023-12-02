import React from "react";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
import Home from "../home";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import InterestOptions from "../../src/components/interest/InterestOptions";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MainLayout configData={configData}>
        <InterestOptions configData={configData} />
      </MainLayout>
    </>
  );
};

export default Index;
Index.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;
export {getServerSideProps}
