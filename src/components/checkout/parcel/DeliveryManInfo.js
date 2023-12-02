import React from "react";
import { Stack, styled } from "@mui/system";
import { alpha, Avatar, IconButton, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import PhoneIcon from "@mui/icons-material/Phone";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import ClickToCall from "../../header/top-navbar/ClickToCall";
import { getToken } from "../../../helper-functions/getToken";
import toast from "react-hot-toast";
import { not_logged_in_message } from "../../../utils/toasterMessages";
import { useRouter } from "next/router";

const ColorCard = styled(CustomStackFullWidth)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.2),
  padding: "20px 24px",
  marginTop: "10px",
  justifyContent: "space-between",
}));
const RoundedIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.neutral[100],
  padding: "11px",
  borderRadius: "50%",
}));
const DeliveryManInfoCard = ({ deliveryManInfo }) => {
  const theme = useTheme();
  const router = useRouter();
  const { configData } = useSelector((state) => state.configData);
  const messageIconColor = alpha(theme.palette.moduleTheme.food, 0.5);
  const name = `${deliveryManInfo?.f_name} ${deliveryManInfo?.l_name}`;
  const handleClick = () => {
    if (getToken()) {
      router.push({
        pathname: "/profile",
        query: {
          page: "inbox",
          type: "delivery_man",
          id: deliveryManInfo?.id,
          routeName: "delivery_man_id",
          chatFrom: "true",
          deliveryman_name: deliveryManData?.f_name,
          deliveryManData_image: deliveryManData?.image,
        },
      });
    } else {
      toast.error("uyrttgr");
    }
  };
  return (
    <ColorCard direction="row">
      <Stack direction="row" spacing={1.5}>
        <Avatar
          src={`${configData?.base_urls?.delivery_man_image_url}/${deliveryManInfo?.image}`}
        />
        <Stack>
          <Typography>{name}</Typography>
          <Typography fontSize="13px" color={theme.palette.neutral[500]}>
            <span style={{ paddingRight: "2px" }}>
              <StarRateIcon
                style={{
                  width: "14px",
                  height: "14px",
                  color: messageIconColor,
                }}
              />
            </span>
            {deliveryManInfo?.avg_rating}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1.5}>
        <ClickToCall phone={deliveryManInfo?.phone}>
          <RoundedIconButton>
            <PhoneIcon
              color="primary"
              style={{ width: "20px", height: "20px" }}
            />
          </RoundedIconButton>
        </ClickToCall>

        <RoundedIconButton onClick={handleClick}>
          <TextsmsRoundedIcon
            style={{ width: "20px", height: "20px", color: messageIconColor }}
          />
        </RoundedIconButton>
      </Stack>
    </ColorCard>
  );
};

export default DeliveryManInfoCard;
