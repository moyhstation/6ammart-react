import React, { useState } from "react";
import PropTypes from "prop-types";
import { CustomPaperBigCard } from "../../../styled-components/CustomStyles.style";
import {
  Button,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import BasicInformationForm from "./BasicInformationForm";
import { Stack, styled } from "@mui/system";
import CustomAlert from "../../alert/CustomAlert";
import AccountInformation from "./AccountInformation";
import EditIcon from "@mui/icons-material/Edit";
import AddAddress from "../../../redux/slices/addAddress";
import AddAddressComponent from "../../address/add-new-address/AddAddressComponent";
import { useSelector } from "react-redux";
import editIcon from "../asset/editIcon.png";
import CustomImageContainer from "../../CustomImageContainer";
import { useTheme } from "@emotion/react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const SmallDeviceIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.neutral[400],
  borderRadius: "50%",
  padding: "6px",
}));
const BasicInformation = (props) => {
  const {
    data,
    t,
    refetch,
    setEditProfile,
    editProfile,
    setAddAddress,
    addAddress,
    editAddress,
    addressRefetch,
    setEditAddress,
  } = props;
  const theme = useTheme();
  const { configData } = useSelector((state) => state.configData);
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = () => {
    setEditProfile((prvState) => !prvState);
  };
  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        padding={{ xs: "10px", sm: "15px", md: "20px" }}
      >
        {addAddress ? (
          <Grid container item xs={12} md={12} spacing={3}>
            <AddAddressComponent
              setAddAddress={setAddAddress}
              configData={configData}
              userData={data}
              editAddress={editAddress}
              addressRefetch={addressRefetch}
              setEditAddress={setEditAddress}
            />
          </Grid>
        ) : (
          <>
            {editProfile ? (
              <>
                <Grid container item xs={12} md={12}>
                  <BasicInformationForm
                    {...props}
                    setEditProfile={setEditProfile}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item md={12} xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      fontSize={{ xs: "14px", sm: "14px", md: "16px" }}
                      fontWeight="700"
                    >
                      {t("Personal Details")}
                    </Typography>
                    {isSmall && (
                      <SmallDeviceIconButton onClick={handleClick}>
                        <CustomImageContainer
                          src={editIcon.src}
                          height="16px"
                          width="16px"
                        />
                      </SmallDeviceIconButton>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack
                    spacing={{ xs: 1, sm: 1, md: 1 }}
                    paddingLeft={{ xs: "0px", md: "20px" }}
                  >
                    {data ? (
                      <>
                        <Typography
                          fontWeight="500"
                          fontSize={{ xs: "12px", md: "14px" }}
                        >
                          {t("First Name")}
                          <Typography
                            component="span"
                            marginLeft={{ xs: "13px", md: "10px" }}
                            fontSize={{ xs: "12px", md: "14px" }}
                          >
                            {data?.f_name}
                          </Typography>
                        </Typography>
                        <Typography
                          fontWeight="500"
                          fontSize={{ xs: "12px", md: "14px" }}
                        >
                          {t("Last Name")}
                          <Typography
                            fontSize={{ xs: "12px", md: "14px" }}
                            component="span"
                            marginLeft={{ xs: "13px", md: "10px" }}
                          >
                            {data?.l_name}
                          </Typography>
                        </Typography>
                      </>
                    ) : (
                      <Stack>
                        <Skeleton variant="text" width={150} height={20} />
                        <Skeleton variant="text" width={150} height={20} />
                      </Stack>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack spacing={{ xs: 1, sm: 1, md: 1 }}>
                    {data ? (
                      <>
                        <Typography
                          fontWeight="500"
                          fontSize={{ xs: "12px", md: "14px" }}
                        >
                          {t("Phone")}
                          <Typography
                            component="span"
                            marginLeft={{ xs: "38px", md: "10px" }}
                            fontSize={{ xs: "12px", md: "14px" }}
                          >
                            {data?.phone}
                          </Typography>
                        </Typography>
                        <Typography
                          fontWeight="500"
                          fontSize={{ xs: "12px", md: "14px" }}
                        >
                          {t("Email")}
                          <Typography
                            fontSize={{ xs: "12px", md: "14px" }}
                            component="span"
                            marginLeft={{ xs: "45px", md: "16px" }}
                          >
                            {data?.email}
                          </Typography>
                        </Typography>
                      </>
                    ) : (
                      <Stack>
                        <Skeleton variant="text" width={170} height={20} />
                        <Skeleton variant="text" width={170} height={20} />
                      </Stack>
                    )}
                  </Stack>
                </Grid>
                {!isSmall && (
                  <Grid
                    item
                    xs={6}
                    md={6}
                    align="right"
                    alignSelf="flex-start"
                    marginTop={{ xs: "5px", md: "0px" }}
                  >
                    <Button
                      onClick={handleClick}
                      variant="contained"
                      sx={{ fontSize: "12px", borderRadius: "5px" }}
                      startIcon={
                        <BorderColorIcon
                          style={{ width: "13px", height: "13px" }}
                        />
                      }
                    >
                      {t("Edit Profile")}
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

BasicInformation.propTypes = {};

export default BasicInformation;
