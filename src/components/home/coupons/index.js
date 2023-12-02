import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

import Slider from "react-slick";
import { Box } from "@mui/system";
import { alpha, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import couponsBG from "../assets/coupons_bg.png";
import useGetCoupons from "../../../api-manage/hooks/react-query/useGetCoupons";
import toast from "react-hot-toast";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";

const CustomBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.3),
  border: `2px dashed ${theme.palette.neutral[100]}`,
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  cursor: "pointer",
}));
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CouponBox = ({ item }) => {
  const { t } = useTranslation();
  const [copy, setCopy] = useState(null);
  const handleCopy = (coupon_code) => {
    setCopy(coupon_code);
    navigator.clipboard
      .writeText(coupon_code)
      .then(() => {
        toast(() => (
          <span>
            {t("Code")}
            <b style={{ marginLeft: "4px", marginRight: "4px" }}>
              {coupon_code}
            </b>
            {t("has been copied")}
          </span>
        ));
      })
      .catch((error) => {
        console.error("Failed to copy code:", error);
      });
  };
  const get = t("get");
  const discountText = t("% discount");
  const discountText1 = t("discount");
  const min = t("min Order of");

  return (
    <Box>
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Typography
          fontWeight="bold"
          textAlign="center"
          color="whiteContainer.main"
          sx={{
            fontSize: { xs: "18px", md: "27px" },
            textTransform: "capitalize",
          }}
        >
          {item?.discount_type === "percent"
            ? `${get}  ${item?.discount}${discountText}`
            : `${get} ${getAmountWithSign(
                item?.discount
              )} ${discountText1}`}{" "}
          <Typography
            fontWeight="bold"
            textAlign="center"
            color="whiteContainer.main"
            component="span"
            sx={{
              fontSize: { xs: "18px", md: "27px" },
            }}
          >{`${min} ${getAmountWithSign(item?.min_purchase)}`}</Typography>
        </Typography>
        <CustomBox onClick={() => handleCopy(item?.code)}>
          <Typography
            color="whiteContainer.main"
            fontWeight="bold"
            variant="body2"
          >
            {t("Use Code : ")} {item?.code}
          </Typography>
        </CustomBox>
      </CustomStackFullWidth>
    </Box>
  );
};

const Coupons = (props) => {
  const { data, refetch, isLoading } = useGetCoupons();
  useEffect(() => {
    refetch();
  }, []);
  const background = (theme) =>
    `linear-gradient(${alpha(theme.palette.primary.main, 0.2)}, ${alpha(
      theme.palette.primary.main,
      0.2
    )}), url(${couponsBG?.src})`;
  return (
    <>
      {data && data?.length > 0 && (
        <Box
          sx={{
            background: (theme) => background(theme),
            backgroundSize: "cover", // Optional: Adjust the background size to cover the box
            marginTop: "2rem",
            borderRadius: { xs: "0px", md: "5px" },
            padding: { xs: "25px", md: "15px" },
            minHeight: "135px",
            "& .slick-dots": {
              top: "95px",
              "& li": {
                backgroundColor: (theme) => theme.palette.neutral[500],
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                "& button::before": {
                  color: "transparent",
                  borderRadius: "50%",
                },
              },
              "& li.slick-active button::before": {
                backgroundColor: (theme) => theme.palette.neutral[100],
                width: "6px",
                height: "6px",
                borderRadius: "50%",
              },
            },
          }}
        >
          <Slider {...settings}>
            {data.map((item, index) => {
              return <CouponBox key={index} item={item} />;
            })}
          </Slider>
        </Box>
      )}
    </>
  );
};

Coupons.propTypes = {};

export default Coupons;
