import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { Typography } from "@mui/material";
import CustomModal from "../../modal";
import CloseIcon from "@mui/icons-material/Close";

const SingleOrderAttachment = (props) => {
  const { title, attachment, configData } = props;
  const [openModal, setModalOpen] = useState(false);
  const handleImageOnClick = (value) => {
    setModalOpen(true);
  };

  return (
    <CustomStackFullWidth
      alignItems="flex-start"
      spacing={2}
      pl={{ xs: "0px", sm: "0px", md: "28px" }}
      pb="20px"
    >
      <Stack
        onClick={() => handleImageOnClick(attachment)}
        sx={{ cursor: "pointer" }}
      >
        <CustomImageContainer
          src={`${configData?.base_urls?.order_attachment_url}/${attachment}`}
          width="100px"
          height="100px"
          alt="prescription"
          borderRadius="2px"
          smWidth="60px"
          smHeight="60px"
        />
      </Stack>
      <CustomModal
        openModal={openModal}
        handleClose={() => setModalOpen(false)}
      >
        <Stack position="relative">
          <button
            onClick={() => setModalOpen(false)}
            style={{
              zIndex: "999",
              position: "absolute",
              right: 0,
              cursor: "pointer",
              border: "none",
              borderRadius: "50%",
              width: " 2rem",
              height: "2rem",
            }}
          >
            <CloseIcon sx={{ fontSize: "16px" }} />
          </button>
          <CustomImageContainer
            src={`${configData?.base_urls?.order_attachment_url}/${attachment}`}
            width="600px"
            smWidth="300px"
            objectfit="contain"
            alt="prescription"
          />
        </Stack>
      </CustomModal>
    </CustomStackFullWidth>
  );
};

SingleOrderAttachment.propTypes = {};

export default SingleOrderAttachment;
