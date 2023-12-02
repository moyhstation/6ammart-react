import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import StoresInfoCard from "./StoresInfoCard";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Box } from "@mui/system";
import {LoadingButton} from "@mui/lab";

const CardsGrid = ({ data, totalSize, handleMore, isFetching }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                <StoresInfoCard data={item} />
              </Grid>
            );
          })}
        <Grid item xs={12} md={12} align="center" my="1rem">
          {totalSize > data.length && (
            <LoadingButton
              sx={{ padding: "10px 50px" }}
              variant="contained"
              onClick={handleMore}
              loading={isFetching}
            >
              {t("See more")}
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
CardsGrid.propTypes = {};

export default CardsGrid;
