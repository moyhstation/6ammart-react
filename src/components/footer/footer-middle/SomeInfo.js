import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import {
  CustomStackFullWidth,
  CustomTypographyBold,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import ClickToCall from "../../header/top-navbar/ClickToCall";
import SendMail from "../../SendMail";

const SomeInfo = (props) => {
  const { image, alt, title, info, t, phone } = props;
  const theme = useTheme();
  const handleClick = () => {};
  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        img: {
          transition: "all ease 0.5s",
        },
        "&:hover": {
          ".MuiTypography-body1": {
            letterSpacing: "0.03em",
            color: theme.palette.primary.main,
          },
          img: {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <CustomImageContainer src={image.src} alt={alt} height={50} width={50} />
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={1}
        onClick={handleClick}
      >
        <CustomTypographyBold
          sx={{
            textTransform: "capitalize",
            transition: "all ease 0.5s",
          }}
        >
          {t(title)}
        </CustomTypographyBold>
        {phone ? (
          <ClickToCall phone={info}>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {info}
            </Typography>
          </ClickToCall>
        ) : (
          <SendMail email={info}>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              {info}
            </Typography>
          </SendMail>
        )}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

SomeInfo.propTypes = {};

export default SomeInfo;
