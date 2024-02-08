import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { alpha, Button } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { VIEW_ALL_TEXT } from "../../../utils/staticTexts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ViewMore = ({ redirect, handlePopoverCloseSub, buttonType }) => {
  const router = useRouter();
  const handleClick = () => {
    handlePopoverCloseSub?.();
    if (redirect === "/categories") {
      router.push(
        {
          pathname: "/home",
          query: {
            search: VIEW_ALL_TEXT.allCategories,
            from: "allCategories",
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(redirect, undefined, { shallow: true });
    }
  };
  return (
    <CustomStackFullWidth>
      <Button
        onClick={() => handleClick()}
        variant={buttonType ? buttonType : "outlined"}
        sx={{
          width: "90px",
          textTransform: "capitalize",
          fontSize: "12px",
          fontWeight: "400",
          color: buttonType ? "whiteContainer.main" : "primary.main",
          boxShadow: (theme) =>
            `0px 23px 54px 0px ${alpha(theme.palette.primary.main, 0.05)}`,
          padding: "5px 5px",
        }}
      >
        {t("View all")}{" "}
        <ArrowForwardIcon sx={{ fontSize: "16px", marginInlineStart: "5px" }} />
      </Button>
    </CustomStackFullWidth>
  );
};
ViewMore.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default ViewMore;
