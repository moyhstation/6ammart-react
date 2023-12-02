import React from "react";
import { alpha, Grid, Typography, useTheme } from "@mui/material";
import CustomImageContainer from "../../../CustomImageContainer";
import { Stack } from "@mui/system";
import CustomRatings from "../../../search/CustomRatings";
import { t } from "i18next";

const StoreAndDeliveryManCommon = ({ data, imageUrl, image, fromDelivery }) => {
  const theme = useTheme();
  const totalOrderText = t("Delivery Completed");
  return (
    <>
      <Grid item md={1.2} sm={4} xs={3}>
        {data && (
          <CustomImageContainer
            src={`${imageUrl}/${image}`}
            height="100px"
            smWidth="60px"
            smHeight="60px"
            borderRadius=".5rem"
            width="100px"
            objectfit="cover"
          />
        )}
      </Grid>
      <Grid item md={8} sm={8} xs={10.8} alignSelf="center">
        <Typography fontWeight="800" fontSize={{ xs: "14px", md: "22px" }}>
          {data && data?.name ? data?.name : data?.f_name}
        </Typography>
        <Stack direction="row" alignItems="center">
          <CustomRatings
            readOnly="true"
            ratingValue={data?.avg_rating}
            color={theme.palette.warning.new}
          />
          <Typography fontSize={{ xs: "10px", md: "13.4px" }} fontWeight="700">
            ({data?.avg_rating.toFixed(2)})
          </Typography>

          <Typography
            fontSize={{ xs: "10px", md: "13.4px" }}
            fontWeight="700"
            ml="9px"
            paddingLeft="9px"
            sx={{
              textDecoration: "underLine",
              borderLeft: "2px solid",
              borderColor: (theme) => alpha(theme.palette.neutral[400], 0.4),
              color: (theme) => alpha(theme.palette.neutral[600], 0.9),
            }}
          >
            {data?.rating_count} {t("Reviews")}
          </Typography>
        </Stack>
        {fromDelivery !== "true" ? (
          <Typography fontSize={{ xs: "10px", md: "13.4px" }} mt="3px">
            {t("Address")} : {data && data?.address}
          </Typography>
        ) : (
          <Typography fontSize={{ xs: "10px", md: "13.4px" }}>
            {`${data?.order_count} ${totalOrderText}`}{" "}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default StoreAndDeliveryManCommon;
