import { Typography, useTheme } from '@mui/material'
import { t } from 'i18next';
import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style';

const FooterBottomItems = ({ configData,handleClickToRoute }) => {
    const theme = useTheme();
    return (
        <CustomStackFullWidth
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 3 }}
            alignItems={{ xs: "start", sm:"center"}}
            justifyContent={{xs:"flex-start", sm:"flex-end"}}
        >
            <Typography
                onClick={() => handleClickToRoute("/terms-and-conditions")}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                {t("Terms & Conditions")}
            </Typography>
            <Typography
                onClick={() => handleClickToRoute("/privacy-policy")}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                {t("Privacy Policy")}
            </Typography>
            {configData?.refund_policy !== 0 && (
                <Typography
                    onClick={() => handleClickToRoute("/refund-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {t("Refund Policy")}
                </Typography>
            )}
            {configData?.cancelation_policy !== 0 && (
                <Typography
                    onClick={() => handleClickToRoute("/cancellation-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {t("Cancellation Policy")}
                </Typography>
            )}
            {configData?.shipping_policy !== 0 && (
                <Typography
                    onClick={() => handleClickToRoute("/shipping-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {t("Shipping Policy")}
                </Typography>
            )}
        </CustomStackFullWidth>
    )
}

export default FooterBottomItems