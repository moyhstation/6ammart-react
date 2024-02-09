import {
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomButtonPrimary } from "../../styled-components/CustomButtons.style";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { IsSmallScreen } from "../../utils/CommonValues";
import CustomImageContainer from "../CustomImageContainer";
import DollarSignHighlighter from "../DollarSignHighlighter";
import CustomContainer from "../container";
import Subtitle1 from "../typographies/Subtitle1";
import deliveryMan from "./assets/delivery-man.svg";
import seller from "./assets/seller.svg";

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "175px",
  height: "175px",
  [theme.breakpoints.down("md")]: {
    width: "110px",
    height: "110px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95px",
    height: "95px",
  },
}));
const TopText = ({ data }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const { t } = useTranslation();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
    // spacing={1}
    >
      <Typography textAlign="center" variant={isSmall ? "h7" : "h4"} lineHeight={{ xs: "31px", sm: "45px", md: "57px" }}>
        <DollarSignHighlighter theme={theme} text={data?.earning_title} />
      </Typography>
      <Typography
        textAlign="center"
        fontSize={{ xs: "12px", sm: "16px", md: "18px" }}
        lineHeight={{ xs: "15px", sm: "24px", md: "39px" }}
        sx={{ color: "text.secondary", width: "70%" }}>
        {t(data?.earning_sub_title)}
      </Typography>
    </CustomStackFullWidth>
  );
};

const Card = ({
  headingText,
  subtitleText,
  buttonText,
  redirectLink,
  image,
  isSmall,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const redirectHandler = () => {
    router.push(redirectLink, undefined, { shallow: true });
  };
  return (
    <CustomBoxFullWidth
      sx={{
        padding: { xs: "15px 10px", sm: "25px 40px", md: "30px" },
        borderRadius: "10px",
        height: "100%",
        background: (theme) => theme.palette.background.default,
        boxShadow: "0px 23px 40px rgba(3, 157, 85, 0.05)",
        "&:hover": {
          img: {
            transform: "scale(1.04)",
          },
        },
      }}
    >
      <Grid container spacing={{ xs: 0, sm: .5, md: 2 }} alignItems="center" justifyContent="center">
        <Grid item xs={4} md={4}>
          <ImageContainer>
            <CustomImageContainer
              height="100%"
              width="100%"
              src={image.src}
              alt={t("Delivery man")}
              objectFit="cover"
            />
          </ImageContainer>
        </Grid>
        <Grid item xs={5} md={5.5}>
          <Stack alignItems="flex-start" justifyContent="flex-start">
            <Typography
              textAlign="flex-start"
              fontWeight="700"
              lineHeight={{ xs: "18px", sm: "24px", md: "33px" }}
              fontSize={{ xs: "14px", sm: "18px", md: "26px" }}
            >
              <DollarSignHighlighter
                theme={theme}
                text={headingText ? headingText : ""}
              />
            </Typography>
            <Typography
              variant={isSmall ? "body3" : "body1"}
              mt="10px"
              color="text.secondary"
              textAlign="flex-start"
            >
              <DollarSignHighlighter
                theme={theme}
                text={subtitleText ? subtitleText : ""}
              />
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={3} md={2.5} align="end">
          {buttonText && redirectLink && (
            <CustomButtonPrimary onClick={redirectHandler}>
              <Typography
                variant={isSmall ? "body3" : "body1"}
                fontWeight="bold"
                color="whiteContainer.main,"
              >
                {buttonText ? buttonText : ""}
              </Typography>
            </CustomButtonPrimary>
          )}
        </Grid>
      </Grid>
    </CustomBoxFullWidth>
  );
};

const CenterCards = ({ data, isSmall }) => {
  return (
    <CustomStackFullWidth
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, md: 4 }}
      justifyContent="space-between"
      alignItems="stretch"
    >
      {data?.earning_seller_title && (
        <Card
          image={seller}
          headingText={data?.earning_seller_title}
          subtitleText={data?.earning_seller_sub_title}
          buttonText={data?.earning_seller_button_name}
          redirectLink={data?.earning_seller_button_url}
          isSmall={isSmall}
        />
      )}

      {data?.earning_dm_title && (
        <Card
          image={deliveryMan}
          headingText={data?.earning_dm_title}
          subtitleText={data?.earning_dm_sub_title}
          buttonText={data?.earning_dm_button_name}
          redirectLink={data?.earning_dm_button_url}
          isSmall={isSmall}
        />
      )}
    </CustomStackFullWidth>
  );
};
const Registration = ({ data, isSmall }) => {
  return (
    <CustomContainer>
      <CustomStackFullWidth
        py={{ xs: "1.125rem", md: "3.125rem" }}
        spacing={IsSmallScreen() ? 2.5 : 5}
        height="100%"
      >
        <TopText data={data} />
        <CenterCards data={data} isSmall={isSmall} />
      </CustomStackFullWidth>
    </CustomContainer>
  );
};

Registration.propTypes = {};

export default Registration;
