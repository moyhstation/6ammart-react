import React, { useState } from "react";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import CustomImageContainer from "../../../CustomImageContainer";
import { useSelector } from "react-redux";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import CustomModal from "../../../modal";
import CloseIcon from "@mui/icons-material/Close";

const PrescriptionOrderSummery = ({ data, trackOrderData }) => {
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageOnClick = (value) => {
    setModalImage(value);
    setModalOpen(true);
  };
  const handleModalClose = (value) => {
    setModalOpen(value);
    setModalImage(null);
  };
  return (
    <>
      <Stack
        direction="row"
        gap="20px"
        flexWrap="wrap"
        paddingLeft={{ xs: "0px", sm: "0px", md: "28px" }}
      >
        {data?.order_attachment?.map((attachment, index) => {
          return (
            <Stack
              key={index}
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
          );
        })}
      </Stack>
      {/*<Stack width="100%" marginTop="auto">*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">{t("Item Price")}</Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            {trackOrderData && getAmountWithSign(trackOrderData?.order_amount + trackOrderData?.store_discount_amount - trackOrderData?.coupon_discount_amount - trackOrderData?.total_tax_amount - trackOrderData?.dm_tips - trackOrderData?.delivery_charge)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">{t("Discount")}</Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            (-) {trackOrderData && getAmountWithSign(trackOrderData?.store_discount_amount)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">{t("Coupon discount")}</Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            (+) {trackOrderData && getAmountWithSign(trackOrderData?.coupon_discount_amount)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            {t('Vat/Tax')}*/}
      {/*            {trackOrderData?.tax_status === 'included'*/}
      {/*                ? '(included)'*/}
      {/*                : ''}*/}
      {/*        </Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            {trackOrderData?.tax_status !==*/}
      {/*                'included' && ' (+) '}*/}
      {/*            {trackOrderData && getAmountWithSign(trackOrderData?.total_tax_amount)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">{t("Deliveryman tips")}</Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            (+) {trackOrderData && getAmountWithSign(trackOrderData?.dm_tips)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold">{t("Delivery fee")}</Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            (+) {trackOrderData && getAmountWithSign(trackOrderData?.delivery_charge)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*    <Stack*/}
      {/*        width="100%"*/}
      {/*        sx={{*/}
      {/*            mt: "20px",*/}
      {/*            mb: "10px",*/}
      {/*            borderBottom: (theme) => `2px solid ${theme.palette.neutral[300]}`,*/}
      {/*        }}*/}
      {/*    ></Stack>*/}
      {/*    <CustomStackFullWidth*/}
      {/*        direction="row"*/}
      {/*        alignItems="center"*/}
      {/*        justifyContent="space-between"*/}
      {/*        spacing={2}*/}
      {/*    >*/}
      {/*        <Typography fontWeight="bold" color="primary.main">*/}
      {/*            {t("Total")}*/}
      {/*        </Typography>*/}
      {/*        <Typography fontWeight="bold">*/}
      {/*            {trackOrderData && getAmountWithSign(trackOrderData?.order_amount)}*/}
      {/*        </Typography>*/}
      {/*    </CustomStackFullWidth>*/}
      {/*</Stack>*/}

      <CustomModal openModal={openModal} handleClose={handleModalClose}>
        <Stack position="relative">
          <button
            onClick={() => handleModalClose()}
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
            src={`${configData?.base_urls?.order_attachment_url}/${modalImage}`}
            width="600px"
            smWidth="300px"
            objectfit="contain"
          />
        </Stack>
      </CustomModal>
    </>
  );
};

export default PrescriptionOrderSummery;
