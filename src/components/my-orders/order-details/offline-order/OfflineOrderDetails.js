import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { CustomStackFullWidth } from '../../../../styled-components/CustomStyles.style';
import CustomDivider from '../../../CustomDivider';
import { t } from 'i18next';
import { ReadMore } from '../../../ReadMore';

const OfflineOrderDetails = ({ trackOrderData, setOpenOfflineModal }) => {
    const theme = useTheme();
    return (
        <CustomStackFullWidth gap="20px" paddingTop="20px">
            <Stack width="100%" maxWidth="350px">
                <Stack flexDirection="row" justifyContent='space-between' paddingBottom="5px">
                    <Typography
                        fontSize="14px"
                        fontWeight="500"
                        color={theme.palette.primary.main}
                    >
                        {t("Seller Payment Info")}
                    </Typography>
                    <Typography
                        fontSize="12px"
                        fontWeight="500"
                        color={theme.palette.primary.main}
                    >
                        {t("Bank Info")}
                    </Typography>
                </Stack>
                {trackOrderData?.offline_payment?.method_fields?.map((item, index) => {
                    return (
                        <Stack padding="3px 0px" key={index}>
                            <Typography sx={{ fontSize: "12px", wordWrap: "break-word", textTransform: "capitalize" }}>
                                {item?.input_name.replaceAll("_", " ")}&nbsp;&nbsp;:&nbsp;&nbsp;
                                <Typography fontWeight="600" component="span" fontSize="12px">
                                    {item?.input_data.replaceAll("_", " ")}
                                </Typography>
                            </Typography>
                        </Stack>
                    )
                })
                }
            </Stack>
            <CustomDivider border="1px" />
            <Stack width="100%" maxWidth="350px">
                <Stack flexDirection="row" justifyContent='space-between' paddingBottom="5px">
                    <Typography
                        fontSize="14px"
                        color={theme.palette.primary.main}
                    >
                        {t("My Payment Info")}
                        <Typography component="span">{` ( ${trackOrderData?.offline_payment?.data?.method_name} )`}</Typography>
                    </Typography>
                    {trackOrderData?.offline_payment?.data?.status !== "verified" && trackOrderData?.order_status === "pending" &&
                        <Typography
                            fontSize="12px"
                            fontWeight="500"
                            color={theme.palette.primary.main}
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenOfflineModal(true)}
                        >
                            {t("Edit Info")}
                        </Typography>
                    }
                </Stack>
                {trackOrderData?.offline_payment?.input?.map((item, index) => {
                    return (
                        <Stack padding="3px 0px" key={index}>
                            <Typography sx={{ fontSize: "12px", wordWrap: "break-word", textTransform: "capitalize" }}>
                                {item?.user_input.replaceAll("_", " ")}&nbsp;&nbsp;:&nbsp;&nbsp;
                                <Typography fontWeight="600" component="span" fontSize="12px">
                                    {item?.user_data.replaceAll("_", " ")}
                                </Typography>
                            </Typography>
                        </Stack>
                    )
                })
                }
                <Stack>
                    {trackOrderData?.offline_payment?.data?.customer_note &&
                        <Typography fontSize="12px">
                            {"Note"}&nbsp;&nbsp;:&nbsp;&nbsp;
                            <Typography fontWeight="600" component="span" sx={{ fontSize: "12px", overflowWrap: "break-word", }}>
                                <ReadMore limits="110">
                                    {trackOrderData?.offline_payment?.data?.customer_note}
                                </ReadMore>
                            </Typography>
                        </Typography>
                    }
                </Stack>
            </Stack>
        </CustomStackFullWidth>
    )
}

export default OfflineOrderDetails