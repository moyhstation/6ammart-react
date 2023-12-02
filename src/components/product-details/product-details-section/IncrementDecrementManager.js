import React from "react";
import PropTypes from "prop-types";
import { alpha, Stack, Typography } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import {
  CustomFab,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { t } from "i18next";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";
import { Box } from "@mui/system";

const IncrementDecrementManager = (props) => {
  const { decrementQuantity, incrementQuantity, modalData, productUpdate } =
    props;
  const theme = useTheme();
  const getModule = () => {
    return JSON.parse(window.localStorage.getItem("module"));
  };

  return (
    <CustomStackFullWidth spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography fontWeight="400" color="customColor.textGray">
          {t("Unit")} :
        </Typography>
        <Typography fontWeight="500">{modalData?.unit_type}</Typography>
      </Stack>
      <CustomStackFullWidth
        key={modalData}
        direction={productUpdate ? "column" : "row"}
        spacing={2}
        alignItems={productUpdate ? "flex-start" : "center"}
        justifyContent="flex-start"
      >
        <Stack direction="row" spacing={4} alignItems="center">
          {/*<Typography fontWeight="400" color="customColor.textGray">*/}
          {/*  {t("Quantity")} :*/}
          {/*</Typography>*/}
          <Stack
            direction="row"
            alignIems="center"
            justifyContent="space-between"
            sx={{
              minWidth: { xs: "117px", sm: "130px", md: "142px" },
              backgroundColor:
                getModule()?.module_type === "pharmacy"
                  ? theme.palette.background.custom5
                  : (theme) => alpha(theme.palette.neutral[200], 0.2),
            }}
            borderRadius={
              getModule()?.module_type === "pharmacy" ||
              getModule()?.module_type === "grocery"
                ? "5px"
                : "13%"
            }
            padding={
              getModule()?.module_type === "pharmacy" ||
              getModule()?.module_type === "grocery"
                ? "5px"
                : "0px"
            }
          >
            <CustomFab
              onClick={decrementQuantity}
              aria-label="remove"
              disabled={modalData?.totalPrice === 0 || modalData?.quantity <= 1}
              sx={{
                color:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? (theme) => theme.palette.neutral[1000]
                    : (theme) => alpha(theme.palette.primary.main, 0.9),
                backgroundColor:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? (theme) => theme.palette.background.custom5
                    : (theme) => alpha(theme.palette.primary.main, 0.2),
                boxShadow:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? "none"
                    : "0px 2px 6px rgb(100 116 139 / 12%)",
                borderRadius:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? "0px"
                    : "50%",
                "&:hover": {
                  backgroundColor:
                    getModule()?.module_type === "pharmacy" ||
                    getModule()?.module_type === "grocery"
                      ? (theme) => alpha(theme.palette.neutral[200], 0.2)
                      : (theme) => alpha(theme.palette.primary.main, 0.4),
                },
              }}
            >
              <RemoveIcon size="small" />
            </CustomFab>
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="body1" fontWeight="500" textAlign="center">
                {modalData?.quantity < 10 && "0"}
                {modalData?.quantity}
              </Typography>
            </Stack>
            <CustomFab
              color="primary"
              aria-label="add"
              onClick={incrementQuantity}
              module_type={getModule()?.module_type}
              sx={{
                color:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? (theme) => theme.palette.neutral[1000]
                    : (theme) => theme.palette.neutral[100],
                backgroundColor:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? theme.palette.background.custom5
                    : (theme) => theme.palette.primary.main,
                borderRadius:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? "0px"
                    : "50%",
                boxShadow:
                  getModule()?.module_type === "pharmacy" ||
                  getModule()?.module_type === "grocery"
                    ? "none"
                    : "0px 2px 6px rgb(100 116 139 / 12%)",
                "&:hover": {
                  backgroundColor:
                    getModule()?.module_type === "pharmacy" &&
                    getModule()?.module_type === "grocery"
                      ? (theme) => alpha(theme.palette.neutral[200], 0.2)
                      : (theme) => alpha(theme.palette.primary.main, 0.7),
                },
              }}
            >
              <AddIcon size="small" />
            </CustomFab>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          witdh="100%"
          spacing={1}
          paddingLeft={productUpdate ? "none" : { sm: "0px", md: "45px" }}
        >
          <Typography fontWeight="500" fontSize={{ xs: "12px", md: "14px" }}>
            {t("Total Price")}:
          </Typography>
          <Typography fontWeight="500" fontSize={{ xs: "12px", md: "14px" }}>
            {modalData &&
              getAmountWithSign(
                getDiscountedAmount(
                  modalData?.totalPrice,
                  modalData?.discount,
                  modalData?.discount_type,
                  modalData?.store_discount,
                  modalData?.quantity
                )
              )}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

IncrementDecrementManager.propTypes = {};

export default IncrementDecrementManager;
