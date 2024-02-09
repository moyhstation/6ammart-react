import React from 'react'
import { Button, Stack, Typography, styled, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { t } from 'i18next'
import CustomContainer from '../container'
import DeleAccountIcon from './asset/DeleAccountIcon'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { useRouter } from 'next/router'

const DeleteAccountWrapper = styled(Stack)(
    ({ theme }) => ({
        backgroundColor: theme.palette.neutral[1800],
        textAlign: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "422px",
        gap: "20px",
    })
)

const DeleteAccount = ({ deleteUserHandler, accountDeleteStatus, handleClose, isLoading }) => {
    const theme = useTheme();
    const router = useRouter();
    const handleMyOrders = () => {
        handleClose();
        router.push(
            {
                pathname: "/profile",
                query: { page: "my-orders" },
            },
            undefined,
            { shallow: true }
        );
    }
    return (
        <DeleteAccountWrapper padding={{ xs: "25px", md: "65px" }}>
            <DeleAccountIcon accountDeleteStatus={accountDeleteStatus} />
            <Stack pb="10px">
                <Typography fontSize={{ xs: "14px", sm: "16px" }} fontWeight={700}>
                    {accountDeleteStatus ? t("Delete your account ?") : t("Sorry you can’t delete your account !")}
                </Typography>
                <Typography fontSize="12px" >
                    {accountDeleteStatus ? t("You won’t be able to recover your data again") : t("Please complete your ongoing orders and ")}
                </Typography>
            </Stack>
            <CustomStackFullWidth alignItems="center">
                {accountDeleteStatus ? (
                    <Stack flexDirection="row" gap="15px">
                        <LoadingButton
                            loading={isLoading}
                            sx={{
                                background: (theme) =>
                                    theme.palette.error.main,
                                color: (theme) =>
                                    theme.palette.neutral[100],
                                width: '120px',
                                '&:hover': {
                                    background: (theme) =>
                                        theme.palette.error.deepLight,
                                },
                            }}
                            onClick={() => deleteUserHandler()}
                        >
                            <Typography
                                sx={{
                                    color: (theme) =>
                                        theme.palette.neutral[100],
                                }}
                            >
                                {t('Remove')}
                            </Typography>
                        </LoadingButton>
                        <Button
                            sx={{
                                background: (theme) =>
                                    theme.palette.neutral[400],
                                color: `${theme.palette.neutral[100]} !important`,
                                width: '120px',
                                fontWeight: 400,
                                '&:hover': {
                                    background: (theme) =>
                                        theme.palette.neutral[500],
                                },
                            }}
                            onClick={handleClose}
                        >
                            {t('Cancel')}
                        </Button>
                    </Stack>
                ) : (
                    <Button
                        sx={{
                            background: (theme) =>
                                theme.palette.primary.main,
                            color: `${theme.palette.whiteContainer.main} !important`,
                            width: "70%",
                            fontWeight: 400,
                            '&:hover': {
                                background: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                        onClick={handleMyOrders}
                    >
                        {t('View My Orders')}
                    </Button>
                )

                }
            </CustomStackFullWidth>
        </DeleteAccountWrapper >
    )
}

export default DeleteAccount