import React, { useReducer } from "react";
import {
  CustomIconButton,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { handleClick } from "../HelperFunctions";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { t } from "i18next";
import { useTheme } from "@emotion/react";
import { initialState, reducer } from "../states";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";

const AddNewAddressButton = ({
  parcel,
  fromModal,
  align,
  handleAddressModal,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { openAddressModal } = useSelector((state) => state.addressModel);
  const dispatch = useDispatch();

  return (
    <Box sx={{ marginInline: fromModal === "true" && "auto !important" }}>
      {parcel === "true" ? (
        <CustomIconButton onClick={() => dispatch(setOpenAddressModal(true))}>
          <Typography
            fontSize="12px"
            fontWeight="400"
            color={theme.palette.primary.main}
          >
            {t("Add New Address")}
          </Typography>
          <AddCircleOutlineIcon fontSize="12px" color="primary" />
        </CustomIconButton>
      ) : (
        <>
          {fromModal === "true" ? (
            <Button onClick={handleAddressModal} variant="contained">
              <AddIcon
                sx={{
                  color: (theme) => theme.palette.whiteContainer.main,
                  width: "20px",
                  height: "22px",
                }}
              />
              <Typography
                fontSize="16px"
                fontWeight="600"
                variant="contained"
                sx={{
                  width: { xs: "61px", sm: "inherit" },
                  color: (theme) => theme.palette.whiteContainer.main,
                }}
              >
                {isSmall ? t("Add New") : t("Add Address")}
              </Typography>
            </Button>
          ) : (
            <CustomIconButton onClick={handleAddressModal} align={align}>
              <AddCircleOutlineIcon fontSize="14px" color="primary" />
              <Typography
                fontSize={{ xs: "14", md: "12px" }}
                fontWeight="600"
                variant="contained"
                sx={{
                  width: { xs: "62px", sm: "inherit" },
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                {isSmall ? t("Add New") : t("Add New Address")}
              </Typography>
            </CustomIconButton>
          )}
        </>
      )}
    </Box>
  );
};

export default AddNewAddressButton;
