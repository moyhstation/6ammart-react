import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import { NoSsr, useMediaQuery } from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import ProductSearchPage from "../../src/components/search";
import HomeSearch from "../../src/components/search/HomeSearch";
import { Box } from "@mui/system";
import ManageSearch from "../../src/components/header/second-navbar/ManageSearch";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  const matches = useMediaQuery("(max-width:1180px)");
  const { t } = useTranslation();
  const router = useRouter();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  let zoneid = undefined;
  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
  }
  return (
    <>
      <CssBaseline />
      <MainLayout configData={configData}>
        <NoSsr>
          <Box marginBottom="10px" marginTop={!matches && "-2.5rem"}>
            {matches && (
              <ManageSearch maxwidth="true" token={token} zoneid={zoneid} />
            )}
          </Box>
          <ProductSearchPage configData={configData} token={token} />
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
