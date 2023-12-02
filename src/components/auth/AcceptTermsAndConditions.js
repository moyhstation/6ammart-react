import React from "react";
import {CustomStackFullWidth,} from "../../styled-components/CustomStyles.style";
import {Checkbox, FormControlLabel, Typography, useTheme} from "@mui/material";
import {t} from "i18next";
import {CustomTypography} from "../landing-page/hero-section/HeroSection.style";

const AcceptTermsAndConditions = ({
                                      handleCheckbox,
                                      formikType,
                                      handleClick,
                                  }) => {
    const theme = useTheme();
    return (
        <CustomStackFullWidth>
            <CustomStackFullWidth
                direction="row"
                alignItems="center"
                spacing={{xs: "0", md: ".5"}}
                sx={{mt: "-10px"}}
            >
                <FormControlLabel
                    sx={{
                        marginRight: "5px",
                        "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                            color: (theme) => theme.palette.neutral[1000],
                        },
                        [theme.breakpoints.down("sm")]: {
                            "& .MuiFormControlLabel-label": {
                                fontSize: "12px",
                            },
                        },
                    }}
                    control={
                        <Checkbox
                            value="ff"
                            color="primary"
                            onChange={handleCheckbox}
                            required="true"
                        />
                    }
                    //label={t("You must accept the")}
                />
                <Typography

                >
                    {t("You must accept the")} <span onClick={handleClick} style={{
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                    textDecoration: "underline"
                }}>{t('terms and conditions')}</span>
                </Typography>
            </CustomStackFullWidth>
            {formikType.touched.tandc && formikType.errors.tandc && (
                <CustomTypography
                    variant="caption"
                    sx={{
                        fontWeight: "inherit",
                        color: (theme) => theme.palette.error.main,
                    }}
                >
                    {t("You must accept the terms and conditions")}
                </CustomTypography>
            )}
        </CustomStackFullWidth>
    );
};

export default AcceptTermsAndConditions;
