import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";

const NavCategoryShimmer = () => {
  return (
    <CustomStackFullWidth sx={{ padding: "10px" }}>
      {[...Array(10)].map((item, index) => (
        <Stack width="100%" key={index}>
          <Stack
            width="100%"
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton width={20} height={30} />
            <Skeleton width="100%" height={20} />
            <Skeleton width={10} height={20} />
          </Stack>
        </Stack>
      ))}
    </CustomStackFullWidth>
  );
};

export default NavCategoryShimmer;
