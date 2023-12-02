import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomPaperCard } from "../../styled-components/CustomCards.style";
import CustomImageContainer from "../CustomImageContainer";
import { Typography, useTheme } from "@mui/material";
import { t } from "i18next";
import moment from "moment/moment";
import { useSelector } from "react-redux";

import { getModuleId } from "../../helper-functions/getModuleId";
import { useRouter } from "next/router";

const CampaignCard = ({ data }) => {
  const router = useRouter();
  const { configData } = useSelector((state) => state.configData);

  const theme = useTheme();
  const camImage = `${configData?.base_urls?.campaign_image_url}/${data?.image}`;

  const handleClick = (campId) => {
    router.push(
      {
        pathname: "/campaigns/[id]",
        query: { id: `${campId}-${getModuleId()}` },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <CustomStackFullWidth sx={{ height: "100%", cursor: "pointer" }}>
      <CustomPaperCard>
        <CustomStackFullWidth spacing={1} onClick={() => handleClick(data?.id)}>
          <CustomImageContainer src={camImage} height="200px" />
          <Typography
            variant="h5"
            textAlign="left"
            fontWeight="600"
            color={theme.palette.primary.main}
            textTransform="capitalize"
          >
            {data?.title}
          </Typography>
          <Typography textAlign="left">{data?.description}</Typography>
          <Typography textAlign="left" fontWeight="500" variant="subtitle2">
            {"Start Date"}:{"  "}
            {moment(data?.available_date_starts).format("MMMM Do YYYY")}
          </Typography>
          <Typography textAlign="left" fontWeight="500" variant="subtitle2">
            {"Start Date"}:{"  "}
            {moment(data?.available_date_ends).format("MMMM Do YYYY")}
          </Typography>
          <Typography variant="subtitle2" textAlign="left">
            {t("Daily time: ")}
            <Typography
              component="span"
              fontWeight="600"
              variant="h6"
              color={theme.palette.primary.main}
            >
              {moment(data?.start_time, ["HH:mm"]).format("hh:mm a")} -{" "}
              {moment(data?.end_time, ["HH:mm"]).format("hh:mm a")}
            </Typography>
          </Typography>
        </CustomStackFullWidth>
      </CustomPaperCard>
    </CustomStackFullWidth>
  );
};

export default CampaignCard;
