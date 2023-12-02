import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import { handleCloseModal } from "../../address/HelperFunctions";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import AddressSelectionList from "../delivery-address/AddressSelectionList";
import AddNewAddress from "../../address/add-new-address";
import NoSaveAddress from "../../address/NoSaveAddress";
import AddressNotFoundSvg from "../../address/svg/AddressNotFoundSvg";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import AddNewAddressButton from "../../address/add-new-address/AddNewAddressButton";

const SaveAddressModal = (props) => {
  const {
    dispatch,
    data,
    allAddress,
    handleLatLng,
    address,
    isRefetching,
    configData,
    refetch,
    t,
    setAddress,
    handleClose,
    openAddressModal,
    handleAddressModal,
  } = props;
  const theme = useTheme();
  const borderColor = theme.palette.neutral[400];
  const [selectedAddress, setSelectedAddress] = useState(address);

  const handleSelectedAddress = (item) => {
    setSelectedAddress(item);
  };
  const handleSubmit = () => {
    handleLatLng(selectedAddress);

    handleClose();
  };

  return (
    <Stack
      width={{ xs: "300px", sm: "400px", md: "458px" }}
      padding={{ xs: "1rem", sm: "1rem", md: "1.8rem" }}
      spacing={{ xs: 1.3, sm: 1.5, md: 2.5 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          fontSize="16px"
          fontWeight="500"
          color={theme.palette.neutral[1000]}
        >
          {t("Saved Addresses")}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              color: (theme) => theme.palette.neutral[1000],
            }}
          />
        </IconButton>
      </Stack>
      {data?.addresses?.length > 0 ? (
        <>
          <SimpleBar style={{ maxHeight: "40vh" }}>
            <AddressSelectionList
              data={data}
              allAddress={data?.addresses}
              handleLatLng={handleSelectedAddress}
              t={t}
              address={selectedAddress}
              isRefetching={isRefetching}
            />
          </SimpleBar>
          <Stack
            paddingLeft={{ xs: "1rem", sm: "1rem", md: "1.5rem" }}
            pb={{ xs: "1rem", sm: "1rem", md: "1.9rem" }}
          >
            <AddNewAddressButton
              align="flex-start"
              handleAddressModal={handleAddressModal}
            />
            {/*<AddNewAddress*/}
            {/*  refetch={refetch}*/}
            {/*  t={t}*/}
            {/*  configData={configData}*/}
            {/*  openAddressModal={openAddressModal}*/}
            {/*/>*/}
          </Stack>

          <Stack
            direction="row"
            width="100%"
            spacing={1}
            justifyContent="flex-end"
          >
            <Button
              onClick={handleClose}
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: "5px",
                color: borderColor,
                padding: "8px 16px",
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                border: `1px solid ${borderColor}`,
                borderRadius: "5px",
                padding: "8px 22px",
              }}
            >
              {t("Select")}
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <NoSaveAddress
            image={<AddressNotFoundSvg />}
            title="Oops"
            descriptions="You don’t have any saved address yet. please save address to continue"
          />
          <AddNewAddressButton
            align="center"
            fromModal="true"
            handleAddressModal={handleAddressModal}
          />
          {/*<AddNewAddress*/}
          {/*  refetch={refetch}*/}
          {/*  t={t}*/}
          {/*  configData={configData}*/}
          {/*  openAddressModal={openAddressModal}*/}
          {/*/>*/}
        </>
      )}
    </Stack>
  );
};

export default SaveAddressModal;
