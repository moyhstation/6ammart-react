import React from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import { Stack } from "@mui/material";
import MiddleSection from "./MiddleSection";
import ItemSection from "./ItemSection";
import {useTheme} from "@emotion/react";

const CampaignsDetails = ({
  campaignsDetails,
  configData,
  isRefetching,
  isLoading,
}) => {
  const theme=useTheme()
  const camImage = `${configData?.base_urls?.campaign_image_url}/${campaignsDetails?.image}`;
  return (
    <CustomStackFullWidth pt="20px">
      <Stack spacing={3} justifyContent="center" alignItems="center">
        <CustomImageContainer
          src={camImage}
          width="100%"
          height="300px"
          smHeight="150px"
          objectfit="cover"
          borderRadius=".5rem"
        />
        <CustomPaperBigCard backgroundcolor={theme.palette.background.custom2}>
          <CustomStackFullWidth spacing={{ xs: 1, md: 3 }}>
            <MiddleSection
              campaignsDetails={campaignsDetails}
              image={camImage}
            />
            <ItemSection
              campaignsDetails={campaignsDetails}
              isLoading={isLoading}
              isRefetching={isRefetching}
            />
          </CustomStackFullWidth>
        </CustomPaperBigCard>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default CampaignsDetails;
