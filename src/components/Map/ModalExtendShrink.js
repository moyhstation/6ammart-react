import React from "react";
import { IconButton, styled, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Wrapper = styled(IconButton)(({ theme }) => ({
  boxShadow: "0px 4.48276px 11.2069px rgba(0, 0, 0, 0.1)",
  borderRadius: "3.36207px",
  width: "35px",
  height: "35px",
  position: "relative",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
const ModalExtendShrink = (props) => {
  const { isModalExpand, setIsModalExpand, t } = props;
  return (
    <Wrapper onClick={() => setIsModalExpand((prev) => !prev)}>
      {isModalExpand ? (
        <Tooltip title={t("Close fullscreen")} arrow placement="top">
          <FullscreenExitIcon />
        </Tooltip>
      ) : (
        <Tooltip title={t("Fullscreen")} arrow placement="top">
          <FullscreenIcon />
        </Tooltip>
      )}
    </Wrapper>
  );
};

ModalExtendShrink.propTypes = {};

export default ModalExtendShrink;
