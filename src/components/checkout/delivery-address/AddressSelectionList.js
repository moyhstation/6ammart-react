import React, { useReducer, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import {
  CustomList,
  CustomListItem,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import ListItemText from "@mui/material/ListItemText";
import { alpha, IconButton, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import CustomAlert from "../../alert/CustomAlert";
// import CustomCheckOutShimmer from '../../CustomShimmerForCheckout/CustomCheckOutShimmer'
import { useTheme } from "@mui/material/styles";
import AddNewAddress from "../../address/add-new-address";
import { ACTIONS, initialState, reducer } from "../../address/states";
import { Stack } from "@mui/system";
import SimpleBar from "simplebar-react";
import { CustomTypographyEllipsis } from "../../../styled-components/CustomTypographies.style";

const AddressSelectionList = (props) => {
  const theme = useTheme();
  const {
    data,
    allAddress,
    handleLatLng,
    t,
    address,
    isRefetching,
    refetch,
    configData,
    setSelectedAddress,
    renderOnNavbar,
  } = props;
  return (
    <>
      <Stack gap="15px">
        {data &&
          allAddress?.length > 0 &&
          data?.addresses?.map((item, index) => (
            <Stack key={item.id}>
              <CustomListItem
                border={
                  item.id === address?.id ?
                    `1px solid ${theme.palette.primary.main}` :
                    `1px solid ${theme.palette.neutral[200]}`
                }
                onClick={() => handleLatLng(item)}
                alignItems="flex-start"
                selected={item.id === address?.id}
                cursor="pointer"
              // className="selected"
              >
                <CustomStackFullWidth direction="row" alignItems="flex-start">
                  <Radio
                    checked={item.id === address?.id}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ marginTop: "-2px" }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        textTransform="capitalize"
                        fontSize={{ xs: "13px", sm: "14px", md: "16px" }}
                        fontWeight={item.id === address?.id ? "600" : "600"}
                      >
                        {t(item.address_type)}
                      </Typography>
                    }
                    secondary={
                      <CustomTypographyEllipsis
                        sx={{
                          fontSize: {
                            xs: "10px",
                            md: "12px",
                            maxWidth:
                              renderOnNavbar === "true" ? "220px" : "100%",
                          },
                        }}
                      >
                        {item.address}
                      </CustomTypographyEllipsis>
                    }
                  />
                </CustomStackFullWidth>
              </CustomListItem>
            </Stack>
          ))}
        {!isRefetching && allAddress?.length === 0 && (
          <CustomAlert
            type="info"
            text={t("No saved addresses found to select.")}
          />
        )}
        {/*{!data && <CustomCheckOutShimmer />}*/}
      </Stack>
    </>
  );
};

AddressSelectionList.propTypes = {};

export default AddressSelectionList;
