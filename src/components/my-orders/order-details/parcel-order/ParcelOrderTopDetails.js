import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Skeleton, Typography } from "@mui/material";
import { CustomTypography } from "../../../landing-page/hero-section/HeroSection.style";
import CustomFormatedDateTime from "../../../date/CustomFormatedDateTime";
import { HeadingBox } from "../../myorders.style";

const ParcelOrderTopDetails = ({ data, t }) => {
  return (
    <HeadingBox>
      <CustomStackFullWidth alignItems="center" justifyContent="center">
        {data ? (
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "36px",
              fontWeight: "600",
            }}
          >
            {t("Parcel Order")} # {data?.id}
          </Typography>
        ) : (
          <Skeleton variant="text" width="200px" height="50px" />
        )}
        {data ? (
          <CustomTypography
            sx={{ color: (theme) => theme.palette.neutral[400] }}
          >
            {t("Parcel Order Placed")} :{" "}
            <CustomFormatedDateTime date={data?.created_at} />
          </CustomTypography>
        ) : (
          <Skeleton variant="text" width="240px" height="20px" />
        )}

        {data && (
          <CustomTypography>
            {t("Parcel Order Scheduled")} :
            <CustomFormatedDateTime date={data?.schedule_at} />
          </CustomTypography>
        )}
      </CustomStackFullWidth>
    </HeadingBox>
  );
};

ParcelOrderTopDetails.propTypes = {};

export default ParcelOrderTopDetails;
