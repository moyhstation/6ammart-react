import React, { useEffect, useState } from "react";
// import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Typography } from "@mui/material";
// import CustomImageContainer from '../CustomImageContainer'
import { useSelector } from "react-redux";
// import ImagePreviewOnModal from '../image-preview-on-modal'
// import CustomModal from '../custom-modal/CustomModal'
import { Box } from "@mui/system";
import CustomImageContainer from "../../../CustomImageContainer";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import CustomModal from "../../../modal";
import ImagePreviewOnModal from "../../../chat/ImagePreviewOnModal";

const Refund = (props) => {
  const { t, title, note, image, reason, configData } = props;
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    selectedImage && setOpenModal(true);
  }, [selectedImage]);
  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const handleModalClose = (value) => {
    setOpenModal(value);
    setSelectedImage(null);
  };
  return (
    <CustomStackFullWidth spacing={0.5}>
      <Typography
        sx={{
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {t(title)}
      </Typography>
      {reason && (
        <Typography sx={{ color: (theme) => theme.palette.neutral[400] }}>
          {reason}
        </Typography>
      )}
      {note && (
        <Typography sx={{ color: (theme) => theme.palette.neutral[400] }}>
          {reason && t("Note:-")} {note}
        </Typography>
      )}

      {image && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          gap={1}
          flexWrap="wrap"
        >
          {JSON.parse(image)?.map((item, index) => (
            <Box key={index} onClick={() => handleImageClick(item)}>
              <CustomImageContainer
                src={`${configData?.base_urls?.refund_image_url}/${item}`}
                alt={note}
                height="100px"
                width="100px"
              />
            </Box>
          ))}
          <CustomModal openModal={openModal} handleClose={handleModalClose}>
            <ImagePreviewOnModal
              modalImage={`${configData?.base_urls?.refund_image_url}/${selectedImage}`}
              handleModalClose={handleModalClose}
            />
          </CustomModal>
        </CustomStackFullWidth>
      )}
    </CustomStackFullWidth>
  );
};

Refund.propTypes = {};

export default Refund;
