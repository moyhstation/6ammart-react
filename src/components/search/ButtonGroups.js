import React, { useState } from "react";
import { Stack } from "@mui/system";
import { PrimaryButton } from "../Map/map.style";
import { CustomColouredTypography } from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { Typography, useTheme } from "@mui/material";

const ButtonGroups = ({ handleSortBy }) => {
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const [selected, setSelected] = useState(filterData.sortBy);
  const theme = useTheme();
  const orangeColor = theme.palette.primary.main;
  const handleAsc = () => {
    setSelected("asc");
    handleSortBy("asc");
  };
  const handleDsc = () => {
    setSelected("dsc");
    handleSortBy("dsc");
  };
  const buttonBg = theme.palette.neutral[1100];
  return (
    <Stack
      alignItems="center"
      justifyContent="flex-start"
      direction={{ xs: "column", sm: "column", md: "row" }}
      spacing={2}
    >
      <PrimaryButton
        backgroundcolor={
          selected === "asc" ? orangeColor : theme.palette.neutral[200]
        }
        onClick={() => handleAsc()}
        sx={{
          border: `1px solid ${buttonBg}`,
          boxShadow: "",
          "&:hover": {
            backgroundColor: theme.palette.neutral[300],
          },
        }}
      >
        <Typography
          fontSize={{ xs: "14px", md: "18px" }}
          color={
            selected === "asc"
              ? theme.palette.neutral[1000]
              : theme.palette.neutral[1000]
          }
        >
          {t("A to Z")}
        </Typography>
      </PrimaryButton>
      <PrimaryButton
        backgroundcolor={
          selected === "dsc" ? orangeColor : theme.palette.neutral[200]
        }
        onClick={() => handleDsc()}
        sx={{
          border: `1px solid ${buttonBg}`,
          boxShadow: "",
          "&:hover": {
            backgroundColor: theme.palette.neutral[300],
          },
        }}
      >
        <Typography
          color={
            selected === "dsc"
              ? theme.palette.neutral[1000]
              : theme.palette.neutral[1000]
          }
          fontSize={{ xs: "14px", md: "18px" }}
        >
          {t("Z to A")}
        </Typography>
      </PrimaryButton>
    </Stack>
  );
};

export default ButtonGroups;
