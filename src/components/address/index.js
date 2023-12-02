import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import {
  Button,
  Grid,
  NoSsr,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import CustomEmptyResult from "../custom-empty-result";
import nodata from "../loyalty-points/assets/no-address-2.png";
import Shimmer from "./Shimmer";
import AddressCard from "./address-card";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { SmallDeviceIconButton } from "../profile/basic-information";
import { useTheme } from "@emotion/react";
import { setAllSaveAddress } from "../../redux/slices/storedData";

export const GrayButton = styled(Button)(({ theme }) => ({
  color: theme.palette.neutral[400],
  fontSize: "12px",
  border: "1px solid",
  borderColor: theme.palette.neutral[400],
  borderRadius: "5px",
}));
const Address = (props) => {
  const {
    configData,
    setAddAddress,
    addAddress,
    setEditAddress,
    data,
    refetch,
    isLoading,
  } = props;
  const { AllSaveAddress } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { openAddressModal } = useSelector((state) => state.addressModel);

  const [edit, setEdit] = useState(null);
  useEffect(() => {
    if (AllSaveAddress?.length === 0) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setAllSaveAddress(data?.addresses));
    }
  }, [data]);

  const handleClick = () => {
    setEditAddress(null);
    setAddAddress((prvState) => !prvState);
  };

  return (
    <CustomStackFullWidth
      padding={{ xs: "10px", sm: "15px", md: "20px" }}
      spacing={2}
    >
      <CustomStackFullWidth
        justifyContent="space-between"
        direction="row"
        alignItems="center"
      >
        <Typography
          fontSize={{ xs: "14px", sm: "14px", md: "16px" }}
          fontWeight="700"
        >
          {t("My Addresses")}
        </Typography>

        <Stack>
          {isSmall ? (
            <SmallDeviceIconButton onClick={handleClick}>
              <LocationOnIcon style={{ fontSize: "16px" }} />
            </SmallDeviceIconButton>
          ) : (
            <GrayButton
              onClick={handleClick}
              variant="outlined"
              startIcon={<LocationOnIcon style={{ fontSize: "16px" }} />}
            >
              {t("Add Address")}
            </GrayButton>
          )}

          {/*{!edit && (*/}
          {/*  <AddNewAddress*/}
          {/*    refetch={refetch}*/}
          {/*    t={t}*/}
          {/*    configData={configData}*/}
          {/*    openAddressModal={openAddressModal}*/}
          {/*  />*/}
          {/*)}*/}
        </Stack>
      </CustomStackFullWidth>
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2.5 }}>
        <Grid item xs={12} md={12}>
          <NoSsr>
            {isLoading ? (
              <Shimmer />
            ) : AllSaveAddress && AllSaveAddress?.length > 0 ? (
              <Box>
                <Grid container>
                  {AllSaveAddress?.map((item, index) => {
                    return (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        paddingRight={{ xs: "10px", sm: "15px", md: "25px" }}
                        paddingBottom={{ xs: "10px", sm: "15px", md: "25px" }}
                      >
                        <AddressCard
                          item={item}
                          refetch={refetch}
                          configData={configData}
                          dispatch={dispatch}
                          openAddressModal={openAddressModal}
                          setEditAddress={setEditAddress}
                          edit={edit}
                          setAddAddress={setAddAddress}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ) : (
              <Stack
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <CustomEmptyResult
                  label="No Address Found"
                  image={nodata}
                  width="128px"
                  height="170px"
                />
              </Stack>
            )}
          </NoSsr>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

Address.propTypes = {};

export default Address;
