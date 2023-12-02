import React from 'react'
import { Button, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { t } from 'i18next';

import { CustomStackFullWidth } from '../../../../styled-components/CustomStyles.style';
import DotSpin from '../../../DotSpin';


const OfflineOrderDetailsModal = ({ trackData, handleOfflineClose, trackDataIsLoading,trackDataIsFetching }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth
      padding={{ xs: "40px 30px", md: "60px 45px 40px" }}
      alignItems="center"
      gap="20px"
    >
      <CheckCircleIcon
        sx={{
          height: "45px", width: "45px", color:
            theme.palette.primary.main
        }}
      />
      <Typography
        fontSize="16px"
        fontWeight="700"
      >
        {`${t("Order Placed Successfully")} !`}
      </Typography>
      <CustomStackFullWidth padding={{ xs: "0px 20px", md: "0px 145px" }} textAlign="center">
        <Typography
          fontSize="14px"
          fontWeight="400"
        >
          {`${t("Your payment has been successfully processed, and your order ")} !`}
          <Typography component="span" fontWeight="600" sx={{ color: theme.palette.primary.main }}> #{trackData?.id} </Typography>
          <Typography component="span" fontWeight="400">{`${t("has been placed.")} !`}</Typography>
        </Typography>
      </CustomStackFullWidth>
      <CustomStackFullWidth
        padding="40px 10px 20px 20px"
        backgroundColor={alpha(theme.palette.primary.main, 0.1)}
        alignItems="center"
        gap="30px"
        borderRadius="10px"
      >
        <Typography fontWeight={500}>{t("Payment Info")}</Typography>
        <CustomStackFullWidth flexDirection={{ xs: "cloumn", sm: "row", md: "row" }}>
          {trackDataIsLoading && trackDataIsFetching ? (
            <Grid container padding="40px">
              <DotSpin />
            </Grid>
          ) : (

            <Grid container spacing={1}>
              {trackData?.offline_payment?.input?.map((item, index) => {
                return (
                  <Grid item xs={12} md={6} key={index}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {item?.user_input.replaceAll("_", " ")}&nbsp;&nbsp;:&nbsp;&nbsp;
                      <Typography fontWeight="600" component="span" sx={{ wordWrap: "break-word" }}>
                        {item?.user_data.replaceAll("_", " ")}
                      </Typography>
                    </Typography>
                  </Grid>
                )
              })
              }
              <Grid item xs={12} md={6}>
                {trackData?.offline_payment?.data?.customer_note &&
                  <Typography>
                    {"Note"}&nbsp;&nbsp;:&nbsp;&nbsp;
                    <Typography fontWeight="600" component="span" sx={{ wordWrap: "break-word" }}>
                      {trackData?.offline_payment?.data?.customer_note }
                    </Typography>
                  </Typography>
                }
              </Grid>
            </Grid>
          )}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
      <Typography color={theme.palette.text.secondary}>
        <Typography
          component="span"
          color={theme.palette.error.main}
          fontSize="18px"
        > * </Typography>
        {t("If you accidentally provided incorrect payment information, you can edit the details in the order details section while the order is still pending.")}
      </Typography>
      <Button
        onClick={handleOfflineClose}
        variant="contained"
      // maxWidth="150px"
      // fullWidth
      >
        {t("Ok")}
      </Button>
    </CustomStackFullWidth>
  )
}

export default OfflineOrderDetailsModal;