import React from "react";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const NavStoreShimmer = () => {
  return (
    <CustomStackFullWidth spacing={0.5}>
      {[...Array(10)].map((item, index) => (
        <Stack key={index} spacing={3}>
          <Skeleton width={150} height={20} />
        </Stack>
      ))}
    </CustomStackFullWidth>
  );
};

export default NavStoreShimmer;
