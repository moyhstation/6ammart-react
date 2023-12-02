import React from "react";
import { Fade, Popover } from "@mui/material";
import Menu from "./Menu";

const AccountPopover = (props) => {
  const { cartListRefetch, anchorEl, onClose, open, ...other } = props;
  return (
    <Popover
      disableScrollLock={true}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={3}
      TransitionComponent={Fade} // You can use 'Grow' or other transitions as well
      // Use TransitionProps to customize the transition duration and other properties
      TransitionProps={{
        timeout: 300, // Transition duration in milliseconds
      }}
      {...other}
    >
      <Menu onClose={onClose} cartListRefetch={cartListRefetch} />
    </Popover>
  );
};

AccountPopover.propTypes = {};

export default AccountPopover;
