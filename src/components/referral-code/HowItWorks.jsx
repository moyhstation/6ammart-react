import React from 'react'
import { Alert, AlertTitle, Chip, Stack, Typography, alpha, styled, useMediaQuery, useTheme } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { t } from 'i18next';

export const HowItWorksPoints = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
}));
export const CustopmChip = styled(Chip)(({ theme }) => ({
    backgroundColor: `${theme.palette.neutral[100]} !important`,
    boxShadow: "0px 3px 6px 0px rgba(3, 157, 85, 0.10);"
}));

const HowItWorks = ({configData}) => {
    const theme = useTheme();
    return (
        <Stack
            width="100%"
            maxWidth="550px"
            gap="15px"
            padding={{ xs: "15px", sm: "20px", md: "25px" }}
            borderRadius="10px"
            sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
            }}
        >
            <Stack flexDirection="row" alignItems="center" gap="7px">
                <InfoOutlinedIcon sx={{ fontSize: "20px" }} />
                <Typography fontSize="16px" fontWeight={700}>{t("How you it works?")}</Typography>
            </Stack>
            <Stack gap="15px">
                <HowItWorksPoints gap="18px">
                    <CustopmChip label="1" />
                    <Typography>
                        {t("Invite and share your code to your friends & family members")}
                    </Typography>
                </HowItWorksPoints>
                <HowItWorksPoints gap="18px">
                    <CustopmChip label="2" />
                    <Typography>
                        {`${t("They create a account on")} ${configData?.business_name} ${t("using your code and place their first order")}`}
                    </Typography>
                </HowItWorksPoints>
                <HowItWorksPoints gap="18px">
                    <CustopmChip label="3" />
                    <Typography>
                        {t("You made your earning when the order is complete")}
                    </Typography>
                </HowItWorksPoints>
            </Stack>
        </Stack>
    )
}

export default HowItWorks