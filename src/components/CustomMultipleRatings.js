import React from "react";
import { alpha, Rating, styled } from "@mui/material";
import { Stack } from "@mui/system";
import Body2 from "./typographies/Body2";
import StarIcon from "@mui/icons-material/Star";

export const StyledRating = styled(Rating)(
  ({ theme, primary_color, hasRating }) => ({
    "& .MuiRating-iconFilled": {
      color:
        primary_color === "true"
          ? theme.palette.primary.main
          : hasRating && alpha(theme.palette.whiteContainer.main, 0.6),
    },
  })
);
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
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
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
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      )}
    </>
  );
};

CustomMultipleRatings.propTypes = {};

export default CustomMultipleRatings;
