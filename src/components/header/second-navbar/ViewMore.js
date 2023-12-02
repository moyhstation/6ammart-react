import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { alpha, Button } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { VIEW_ALL_TEXT } from "../../../utils/staticTexts";

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
          textTransform: "capitalize",
          fontSize: "13px",
          color: buttonType ? "whiteContainer.main" : "primary.main",
          boxShadow: (theme) =>
            `0px 23px 54px 0px ${alpha(theme.palette.primary.main, 0.05)}`,
        }}
      >
        {t("View all")}{" "}
        <ArrowRightAltIcon
          sx={{ fontSize: "18px", marginInlineStart: "5px" }}
        />
      </Button>
    </CustomStackFullWidth>
  );
};
ViewMore.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default ViewMore;
