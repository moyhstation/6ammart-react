import React from "react";
import { Box } from "@mui/system";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import CustomTimeFormat from "../date-and-time-formators/CustomTimeFormat";
import { CustomDateFormat } from "../date-and-time-formators/CustomDateFormat";
import CustomImageContainer from "../CustomImageContainer";
import discount_demo from './assets/discount_demo.png'

const DiscountInfo = ({ discount }) => {
  const { t } = useTranslation();
  const discountAmountHandler = () => {
    if (discount?.discount_type === "percent") {
      return `${discount?.discount}%`;
    } else {
      return getAmountWithSign(discount?.discount);
    }
  };
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        p: ".7rem",
        borderRadius: "10px",
        backgroundColor: "background.paper",
          gap:'5px'
      }}
    >
      <CustomStackFullWidth spacing={.5}>
        <Typography
          color="primary.main"
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "20px" },
          }}
        >
          {t("Enjoy")} {discountAmountHandler()} {t("Off")}
        </Typography>
        <Typography fontWeight="bold">
          {t("Available at")} {<CustomTimeFormat time={discount?.start_time} />}
          - {<CustomTimeFormat time={discount?.end_time} />}
        </Typography>
        <Typography color="customColor.textGray">
          {t("Minimum purchase")} : {getAmountWithSign(discount?.min_purchase)}{" "}
          <span style={{ marginLeft: "10px" }}></span> {t("Maximum discount")} :{" "}
          {getAmountWithSign(discount?.max_discount)}
        </Typography>
      </CustomStackFullWidth>
     <Box sx={{
       width:'120px',
       height:'auto',
     }}>
       <CustomImageContainer
           src={discount_demo.src}
           width="100%"
           height="100%"
           objectfit="contain"
           borderRadius=".5rem"
       />
     </Box>

    </Box>
  );
};

DiscountInfo.propTypes = {};

export default DiscountInfo;
