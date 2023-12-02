import React from "react";
import { Button, Popover, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";
import CustomImageContainer from "../components/CustomImageContainer";
import sort from "./assets/sort.png";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Wrapper = styled(Button)(({ theme, border }) => ({
  border: border === "true" && `1px solid ${theme.palette.neutral[400]}`,
  borderRadius: "5px",
  width: "100%",
  // padding: "15px",
}));
const HighToLow = ({ handleSortBy, sortBy }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (value) => {
    handleSortBy?.(value);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const getContent = (type, showArrow) => {
    return (
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <CustomImageContainer
          src={sort.src}
          // alt={item?.title}
          height="12px"
          width="12px"
          obejctfit="contained"
        />
        <Typography
          fontSize="13px"
          sx={{ color: (theme) => theme.palette.neutral[600] }}
        >
          {type === "high2Low"
            ? t("Sort by : High to Low")
            : t("Sort by : Low to High")}
          {}
        </Typography>
        {showArrow === "true" && (
          <>
            {open ? (
              <KeyboardArrowUpIcon
                sx={{ color: (theme) => theme.palette.text.secondary }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{ color: (theme) => theme.palette.text.secondary }}
              />
            )}
          </>
        )}
      </CustomStackFullWidth>
    );
  };

  return (
    <div>
      <Wrapper border="true" onClick={handleClick}>
        {getContent(sortBy, "true")}
      </Wrapper>
      <Popover
        fullWidth
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: anchorEl?.clientWidth || "auto",
          },
        }}
      >
        <Wrapper
          onClick={() =>
            handleSelect(sortBy === "high2Low" ? "low2High" : "high2Low")
          }
        >
          {getContent(sortBy === "high2Low" ? "low2High" : "high2Low", "false")}
        </Wrapper>
      </Popover>
    </div>
  );
};

export default HighToLow;
