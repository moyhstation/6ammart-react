import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import { Skeleton } from "@mui/material";

const Shimmer = (props) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <Skeleton
        height={isXSmall ? "110px" : "125px"}
        width={isXSmall ? "110px" : "125px"}
        variant="rectangle"
      />
      <Skeleton variant="text" width="100px" />
    </Stack>
  );
};

export default Shimmer;
