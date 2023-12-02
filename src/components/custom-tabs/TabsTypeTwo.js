import React from "react";
import { Box, Stack } from "@mui/system";
import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CustomTypography = styled(Typography)(({ theme, active }) => ({
  fontSize: "20px",
  cursor: "pointer",
  // borderBottom: active === "true" ? "1px solid" : "none",
  // borderBottomWidth: "50%",
  fontWeight: active === "true" ? "700" : "400",
}));

const ActiveIndicator = styled(Box)(({ theme, active }) => ({
  backgroundColor: active === "true" ? theme.palette.primary.main : "inherit",
  borderRadius: "10px",
  width: "28px",
  height: "3px",
}));
const TabsTypeTwo = (props) => {
  const { tabs, currentTab, setCurrentTab } = props;
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={5}>
      {tabs?.length > 0 &&
        tabs.map((item, index) => {
          return (
            <Stack
              key={index}
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <CustomTypography
                active={currentTab === index ? "true" : "false"}
                onClick={() => setCurrentTab(index)}
              >
                {t(item?.name)}
              </CustomTypography>
              <ActiveIndicator
                active={currentTab === index ? "true" : "false"}
              />
            </Stack>
          );
        })}
    </Stack>
  );
};

TabsTypeTwo.propTypes = {};

export default TabsTypeTwo;
