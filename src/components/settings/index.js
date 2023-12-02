import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, Paper, styled, Typography } from "@mui/material";
import ThemeSwitches from "../header/top-navbar/ThemeSwitches";
import { Stack } from "@mui/system";
import CustomLanguage from "../header/top-navbar/language/CustomLanguage";
import { useSelector } from "react-redux";
import { t } from "i18next";

const CustomPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  //maxWidth: "247px",
  height: "168px",
  marginLeft: "auto",
  marginRight: "auto",
  justifyContent: "center",
}));

const CustomSettings = (props) => {
  const { configData } = props;
  const { countryCode, language } = useSelector((state) => state.configData);
  return (
    <CustomStackFullWidth
      mt="2rem"
      minHeight="80vh"
      paddingLeft={{ xs: "10px", sm: "20px", md: "25px" }}
      paddingRight={{ xs: "10px", sm: "20px", md: "40px" }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomPaper elevation={10}>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <Typography fontWeight="bold">{t("Theme Settings")}</Typography>
              <ThemeSwitches />
            </Stack>
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomPaper elevation={10}>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <Typography fontWeight="bold">{t("Change language")}</Typography>
              <CustomLanguage countryCode={countryCode} language={language} />
            </Stack>
          </CustomPaper>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

CustomSettings.propTypes = {};

export default CustomSettings;
