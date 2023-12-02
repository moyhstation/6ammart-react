import React from "react";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {Typography, useTheme} from "@mui/material";
import {t} from "i18next";
import {SignInButton} from "../NavBar.style";
import {useRouter} from "next/router";
import {Stack} from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const CustomSignButton = ({from}) => {
    const router = useRouter();
    const token = "";
    const theme = useTheme();
    const clickHandler = () => {
        if (router.pathname === '/auth/sign-up') {
            router.push({
                pathname: "/auth/sign-in",
                query: {
                    from: 'sign-up'
                }
            }, undefined, {shallow: true});
        } else {
            router.push({
                pathname: "/auth/sign-in",
            }, undefined, {shallow: true});
        }

    };
    return (
        <>
            <Stack justifyContent="flex-end" alignItems="end">
                <SignInButton onClick={clickHandler} variant="contained">
                    <CustomStackFullWidth direction="row" alignItems="center" spacing={1}>
                        <LockOutlinedIcon
                            fontSize="small"
                            style={{color: theme.palette.whiteContainer.main}}
                        />
                        <Typography color={theme.palette.whiteContainer.main}>
                            {t("Sign In")}
                        </Typography>
                    </CustomStackFullWidth>
                </SignInButton>
            </Stack>
        </>
    );
};

export default CustomSignButton;
