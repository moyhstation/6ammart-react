import React from "react";
import { IconButton, styled, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Wrapper = styled(IconButton)(({ theme, isXSmall }) => ({
  boxShadow: "0px 4.48276px 11.2069px rgba(0, 0, 0, 0.1)",
  borderRadius: "3.36207px",
  width: isXSmall ? "28px" : "35px",
  height: isXSmall ? "28px" : "35px",
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
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Wrapper isXSmall={isXSmall} onClick={() => setIsModalExpand((prev) => !prev)}>
      {isModalExpand ? (
        <Tooltip title={t("Close fullscreen")} arrow placement="top">
          <FullscreenExitIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
        </Tooltip>
      ) : (
        <Tooltip title={t("Fullscreen")} arrow placement="top">
          <FullscreenIcon sx={{ fontSize: { xs: "18px", md: "24px" } }} />
        </Tooltip>
      )}
    </Wrapper>
  );
};

ModalExtendShrink.propTypes = {};

export default ModalExtendShrink;
