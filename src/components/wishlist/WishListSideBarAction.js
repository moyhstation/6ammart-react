import React from "react";
import { Stack } from "@mui/system";
import { PrimaryButton } from "../Map/map.style";

const WishListSideBarAction = () => {
  return (
    <Stack direction="row" width="100%" spacing={1} pb="1rem">
      <PrimaryButton
        variant="contained"
        size="large"
        fullWidth
        borderRadius="7px"
      >
        Add All to Cart
      </PrimaryButton>
    </Stack>
  );
};

export default WishListSideBarAction;
