import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeaderComponent from "../header";
import FooterComponent from "../footer";
import { MainLayoutRoot } from "./LandingLayout";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import BottomNav from "../header/BottomNav";
import { useMediaQuery, useTheme } from "@mui/material";
import CustomContainer from "../container";
import useGetModule from "../../api-manage/hooks/react-query/useGetModule";
import { useRouter } from "next/router";
import { setSelectedModule } from "../../redux/slices/utils";
import { useDispatch } from "react-redux";

const MainLayout = ({ children, configData, landingPageData }) => {
  const [rerenderUi, setRerenderUi] = useState(false);
  const { data, refetch } = useGetModule();
  const theme = useTheme();
  const isSmall = useMediaQuery("(max-width:1180px)");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.pathname === "/home") {
      refetch();
    }
  }, []);
  if (data) {
    const selectedModuleType = JSON.parse(
      localStorage.getItem("module")
    )?.module_type;
    if (data.length === 0) {
      localStorage.removeItem("module");
      router.push("/", undefined, { shallow: true });
    } else {
      if (!data?.find((item) => item.module_type === selectedModuleType)) {
        const newModule = data[0];
        localStorage.setItem("module", JSON.stringify(newModule));
        dispatch(setSelectedModule(newModule));
      }
    }
  }
  return (
    <MainLayoutRoot justifyContent="space-between" key={rerenderUi}>
      <header>
        <HeaderComponent configData={configData} />
      </header>
      <CustomStackFullWidth mt={isSmall ? "3.5rem" : "5.9rem"}>
        <CustomStackFullWidth sx={{ minHeight: "70vh" }}>
          {children}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
      <footer>
        <FooterComponent
          configData={configData}
          landingPageData={landingPageData}
        />
      </footer>
      {isSmall && <BottomNav />}
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(MainLayout);
