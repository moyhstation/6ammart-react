import React from "react";
import { useRouter } from "next/router";
import { CustomMoreButton, CustomMoreButtonContainer } from "./FoodCard.style";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FoodCardMoreButton = ({ route, moreData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <CustomMoreButtonContainer
      onClick={() => router.push(route, undefined, { shallow: true })}
    >
      <CustomMoreButton>
        <Typography variant="h1" fontWeight="400" align="center">
          {" "}
          +{moreData}
        </Typography>
        <Typography variant="h4" align="center">
          {t("view")}
        </Typography>
      </CustomMoreButton>
    </CustomMoreButtonContainer>
  );
};

export default FoodCardMoreButton;
