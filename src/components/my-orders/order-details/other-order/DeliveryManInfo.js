import React from "react";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import StoreAndDeliveryManCommon from "./StoreAndDeliveryManCommon";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import MessageSvg from "./MessageSvg";
import { t } from "i18next";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";
import { StoreChatButton } from "./StoreDetails";
import {getToken} from "../../../../helper-functions/getToken";

const DeliveryManInfo = ({ configData, deliveryManData }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = () => {
    router.push({
      pathname: "/profile",
      query: {
        page: "inbox",
        type: "delivery_man",
        id: deliveryManData?.id,
        routeName: "delivery_man_id",
        chatFrom: "true",
        deliveryman_name: deliveryManData?.f_name,
        deliveryManData_image: deliveryManData?.image,
      },
    });
  };

  return (
    <CustomStackFullWidth
      sx={{
        padding: {
          xs: "20px 10px",
          md: "20px 20px",
        },
        minHeight: "30vh",
      }}
    >
      <Grid container>
        <Grid container item md={12} xs={12}>
          <Stack direction="row" width="100%" spacing={1}>
            <StoreAndDeliveryManCommon
              data={deliveryManData}
              imageUrl={configData?.base_urls?.delivery_man_image_url}
              image={deliveryManData?.image}
              fromDelivery="true"
            />
            {getToken() &&  <StoreChatButton
                variant="contained"
                startIcon={!isSmall && <MessageSvg />}
                onClick={handleClick}
                sx={{ height: "42px" }}
            >
              {isSmall ? <MessageSvg /> : t("See Chat History")}
            </StoreChatButton>}
          </Stack>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

export default DeliveryManInfo;
