import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Typography } from "@mui/material";
import { CustomTypographyGray } from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";

const Transaction = ({ data, page }) => {
  const theme = useTheme();
  return (
    <>
      <Grid container md={12} xs={12} spacing={2} sx={{ padding: "10px" }}>
        <Grid item md={7} xs={4.5}>
          <Typography sx={{ fontWeight: "700" }}>
            {page === "loyalty" ? (
              <>
                {data?.transaction_type === "point_to_wallet"
                  ? data?.debit
                  : data?.credit}{" "}
                {t("points")}
              </>
            ) : (
              <>
                {getAmountWithSign(
                  data?.transaction_type === "point_to_wallet"
                    ? data?.debit
                    : data?.credit
                )}
              </>
            )}
          </Typography>
          <CustomTypographyGray
            sx={{ fontSize: "14px", textTransform: "capitalize" }}
          >
            {t(data?.transaction_type).replaceAll("_", " ")}
          </CustomTypographyGray>
        </Grid>
        <Grid item md={5} xs={7.5} justifySelf="flex-end">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={{ xs: 1, md: 0.5 }}
            flexWrap="wrap"
          >
            <CustomTypographyGray sx={{ fontSize: "14px" }}>
              {data?.created_at}
            </CustomTypographyGray>
            <Typography
              sx={{
                fontSize: "14px",
                textTransform: "capitalize",
                paddingRight: "0px",
              }}
              color={
                data?.transaction_type === "point_to_wallet"
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
            >
              {data?.transaction_type === "point_to_wallet"
                ? t("debit")
                : t("credit")}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

Transaction.propTypes = {};

export default Transaction;
