import { Popover } from "@mui/material";
import React from "react";

const CustomPopover = (props) => {
  const { openPopover, anchorEl, placement, handleClose, children, top, left } =
    props;

  return (
    <Popover
      sx={{
        top: top, // Custom top position
        left: left, // Custom left position
      }}
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: placement,
      }}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
