import React from "react";
import { CustomBadgeWrapepr } from "../cards/CustomBadge";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

const RecommendTag = (props) => {
  const { status, top, left } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      {status === 1 ? (
        <CustomBadgeWrapepr
          bg_color={theme.palette.neutral[800]}
          top={top}
          left={left}
          border_radius="0px 4px 4px 0px"
        >
          {t("Recommend")}
        </CustomBadgeWrapepr>
      ) : null}
    </>
  );
};

RecommendTag.propTypes = {};

export default RecommendTag;
