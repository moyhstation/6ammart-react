import React, { useState } from "react";
import { alpha, Paper, styled, Typography } from "@mui/material";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack } from "@mui/system";
import CustomDivider from "../../CustomDivider";
import IconButton from "@mui/material/IconButton";
import deleteIcon from "../../../../public/static/delete-icon.png";
import { useTranslation } from "react-i18next";
import CustomModal from "../../modal";
import DeleteAddress from "../DeleteAddress";
import AddressEditSvg from "../svg/AddressEditSvg";
import { setOpenAddressModal } from "../../../redux/slices/addAddress";
import AddNewAddress from "../add-new-address";
import { t } from "i18next";
import { useSelector } from "react-redux";

export const AddressTypography = styled(Typography)(
  ({ theme, fontWeight }) => ({
    fontWeight: fontWeight ? fontWeight : "500",
    fontSize: "12px",
  })
);

const AddressCard = (props) => {
  const {
    item,
    refetch,
    dispatch,
    configData,
    edit,
    setEditAddress,
    setAddAddress,
  } = props;
  const {
    address_type,
    contact_person_number,
    address,
    road,
    floor,
    house,
    latitude,
    longitude,
    user_id,
    contact_person_name,
    zone_id,
    id,
  } = item;
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);

  const { openAddressModal } = useSelector((state) => state.addressModel);
  const handleClick = () => {
    setEditAddress(item);
    setAddAddress((prevState) => !prevState);
  };

  return (
    <CustomPaperBigCard
      padding="0px"
      sx={{
        borderRadius: "5px",
        boxShadow:
          "0px 9.075414657592773px 18.150829315185547px -2.7226247787475586px rgba(145, 158, 171, 0.05), 0px 0px 1.8150832653045654px 0px rgba(145, 158, 171, 0.20)",
      }}
    >
      <CustomStackFullWidth spacing={2}>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding={{ xs: " 4px 20px", md: " 13px 20px" }}
          sx={{
            background: (theme) => alpha(theme.palette.info.contrastText1, 0.3),
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          <Typography fontWeight="500" textTransform="capitalize">
            {t(address_type)}
          </Typography>
          <Stack direction="row" alignItems="center">
            <IconButton onClick={handleClick}>
              <AddressEditSvg />
            </IconButton>
            <IconButton onClick={() => setOpenDelete(true)}>
              <img src={deleteIcon.src} alt="delete" />
            </IconButton>
          </Stack>
        </CustomStackFullWidth>

        <Stack padding="0px 20px 23px 20px" spacing={1}>
          <Stack direction="row" gap="30px">
            <AddressTypography>{t("Name")}</AddressTypography>
            <AddressTypography fontWeight="400">
              {contact_person_name}
            </AddressTypography>
          </Stack>
          <Stack direction="row" gap="25px">
            <AddressTypography>{t("Phone")}</AddressTypography>
            <AddressTypography fontWeight="400">
              {contact_person_number}
            </AddressTypography>
          </Stack>
          <Stack direction="row" gap="15px">
            <AddressTypography>{t("Address")}</AddressTypography>
            <AddressTypography fontWeight="400"> {address}</AddressTypography>
          </Stack>
        </Stack>
      </CustomStackFullWidth>
      {openDelete && (
        <DeleteAddress
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          addressId={id}
          refetch={refetch}
        />
      )}
    </CustomPaperBigCard>
  );
};

AddressCard.propTypes = {};

export default AddressCard;
