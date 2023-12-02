import React from "react";
import PropTypes from "prop-types";
import { Rating, styled } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Body2 from "./typographies/Body2";
export const StyledRating = styled(Rating)(({ theme, primary_color }) => ({
  "& .MuiRating-iconFilled": {
    color: primary_color === "true" && theme.palette.primary.main,
  },
}));
const CustomMultipleRatings = (props) => {
  const { rating, PrimaryColor, withCount } = props;
  const handleRating = (rating) => {
    return `(${rating})`;
  };
  return (
    <>
      {withCount ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.4}
        >
          <StyledRating
            primary_color={PrimaryColor ? "true" : "false"}
            name="read-only"
            value={rating}
            readOnly
            sx={{ fontSize: { xs: "18px", md: "22px" } }}
          />
          <Body2 text={handleRating(rating)} />
        </Stack>
      ) : (
        <StyledRating
          primary_color={PrimaryColor ? "true" : "false"}
          name="read-only"
          value={rating}
          readOnly
          sx={{ fontSize: { xs: "18px", md: "17px" } }}
        />
      )}
    </>
  );
};

CustomMultipleRatings.propTypes = {};

export default CustomMultipleRatings;
