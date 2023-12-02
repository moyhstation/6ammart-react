import { Typography, alpha, useTheme } from '@mui/material'
import React from 'react'
import OfflinePaymentDenied from '../../assets/OfflinePaymentDenied';
import { ReadMore } from '../../../ReadMore';
import { CustomStackFullWidth } from '../../../../styled-components/CustomStyles.style';
import { t } from 'i18next';

const OfflineOrderDenied = ({ trackOrderData }) => {
    const theme = useTheme();
    return (
        <CustomStackFullWidth
            sx={{
                border: `1px solid ${alpha(theme.palette.error.deepLight, 0.2)}`,
                marginTop: "20px",
                padding: "15px ",
                borderRadius: "5px",
                maxWidth: "335px",
                gap: "15px"
            }}
        >
            <CustomStackFullWidth
                sx={{
                    flexDirection: "row",
                    gap: "20px",
                    // justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <OfflinePaymentDenied />
                <Typography fontSize="16px" fontWeight={500} color={theme.palette.text.primary}>
                    {t("Payment Denied")}
                </Typography>
                {/* <InfoOutlinedIcon /> */}
            </CustomStackFullWidth>
            <ReadMore limits="110">
                {trackOrderData.offline_payment.data.admin_note}
            </ReadMore>
        </CustomStackFullWidth>
    )
}

export default OfflineOrderDenied