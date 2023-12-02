import React from "react";
import { CustomBadgeWrapepr } from "../cards/CustomBadge";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

const OrganicTag = (props) => {
  const { status, top, left } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      {status === 1 ? (
        <CustomBadgeWrapepr
          bg_color={theme.palette.primary.main}
          top={top}
          left={left}
          border_radius="0px 4px 4px 0px"
        >
          {t("Organic")}
        </CustomBadgeWrapepr>
      ) : null}
    </>
  );
};

OrganicTag.propTypes = {};

export default OrganicTag;
