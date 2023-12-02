import React from 'react'
import { Box, Button, Divider, IconButton, Stack, Typography, styled } from '@mui/material'
import CustomModal from '../modal'
import { useRouter } from 'next/router';
import { t } from 'i18next';
import GuestModalSvg from '../svg-components/GuestModalSvg';
import CustomDivider from '../CustomDivider';
import { CustomStackFullWidth, CustomTypographyGray } from '../../styled-components/CustomStyles.style';
import { CustomTypographyTag } from '../../styled-components/CustomTypographies.style';
import { useTheme } from '@emotion/react';
import CloseIcon from "@mui/icons-material/Close";

const WrapperBox = styled(Stack)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "480px",
    paddingBlock: "20px",
    textAlign: "center",

}))
const ButtonWrapper = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px"

}))

const GuestCheckoutModal = ({ open, setOpen, setSideDrawerOpen ,handleRoute}) => {
    const router = useRouter();
    const theme = useTheme();


    const handleClick = () => {
        handleRoute()
        setSideDrawerOpen(false);
    }

    const handleSignIn = () => {
        router.push('/auth/sign-in');
        setSideDrawerOpen(false);
    }
    const handleSignUp = () => {
        router.push('/auth/sign-up');
        setSideDrawerOpen(false);
    }
    return (
        <CustomModal
            openModal={open}
            handleClose={() => setOpen(false)}
        >

            <WrapperBox>
                <CustomStackFullWidth
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ position: "relative" }}
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            zIndex: "99",
                            position: "absolute",
                            top: -5,
                            right: 15,
                            backgroundColor: (theme) => theme.palette.neutral[100],
                            borderRadius: "50%",
                            [theme.breakpoints.down("md")]: {
                                top: 10,
                                right: 5,
                            },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: "16px", fontWeight: "500" }} />
                    </IconButton>
                </CustomStackFullWidth>
                <GuestModalSvg />
                <Box padding="30px 70px">
                    <Typography variant="h6" marginBottom="20px">
                        {t("Do you want to login or continue as a guest?")}
                    </Typography>
                    <Typography>
                        {t("If you log in, your order history will be saved. However, if you continue as a guest, you won't be able to see your order history after completing your order.")}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-around" width="70%">
                    <Button
                        onClick={handleClick}
                        variant="outlined"
                        maxWidth="150px"
                        fullWidth
                        sx={{
                            marginRight: "10px",
                            borderColor: theme.palette.neutral[200],
                            color: theme.palette.neutral[400],
                        }}
                    >
                        {t("Guest")}
                    </Button>
                    <Button
                        onClick={handleSignIn}
                        variant="contained"
                        maxWidth="150px"
                        fullWidth
                    >
                        {t("Login")}
                    </Button>
                </Box>
                <ButtonWrapper>
                    <CustomDivider border="2px" width="70px" />
                    <CustomTypographyTag
                        onClick={handleSignUp}
                        sx={{
                            paddingInline: "10px"
                        }}
                    >
                        {t("Sign Up")}
                    </CustomTypographyTag>
                    <CustomDivider border="2px" width="70px" />
                </ButtonWrapper>
            </WrapperBox>
        </CustomModal>
    )
}

export default GuestCheckoutModal