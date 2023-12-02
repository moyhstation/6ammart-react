import React from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";
import badam from "./assets/badam.png";
import store from "./assets/store.png";

const SuggestionBasedOnInterest = ({ suggestedKeywords, t }) => {
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomStackFullWidth spacing={2}>
            <Typography variant="h6">{t("Groceries")}</Typography>
            {[...Array(2)].map((item, index) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  key={index}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "40px",
                      width: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    <CustomImageContainer
                      src={badam.src}
                      alt={"item"}
                      height="100%"
                      width="100%"
                      obejctfit="contain"
                    />
                  </Box>
                  <Typography
                    sx={{ color: (theme) => theme.palette.neutral[700] }}
                  >
                    Great value totilla chips
                  </Typography>
                </Stack>
              );
            })}
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomStackFullWidth spacing={2}>
            <Typography variant="h6">{t("Stores")}</Typography>
            {[...Array(2)].map((item, index) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  key={index}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "40px",
                      width: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    <CustomImageContainer
                      src={store.src}
                      alt={"item"}
                      height="100%"
                      width="100%"
                      obejctfit="contain"
                    />
                  </Box>
                  <Typography
                    sx={{ color: (theme) => theme.palette.neutral[700] }}
                  >
                    Organic farm
                  </Typography>
                </Stack>
              );
            })}
          </CustomStackFullWidth>
        </Grid>
      </Grid>
    </CustomBoxFullWidth>
  );
};

export default SuggestionBasedOnInterest;
