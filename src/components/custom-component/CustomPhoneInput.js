import React from "react";

import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";

import {CustomTypography} from "../landing-page/hero-section/HeroSection.style";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {NoSsr} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {useSelector} from "react-redux";

const CustomPhoneNumberInputStyled = styled(PhoneInput)(
    ({theme, languageDirection, borderRadius}) => ({
        "&.react-tel-input .flag-dropdown": {
            backgroundColor: theme.palette.background.custom2,
            border: `1px solid ${theme.palette.neutral[200]}`,
            borderRadius: borderRadius
                ? `${borderRadius}0px 0px ${borderRadius}`
                : "3px 0px 0px 5px",
        },
        "&.react-tel-input .selected-flag .flag": {
            right: languageDirection === "rtl" && "11px",
        },
        "&.react-tel-input .flag-dropdown.open .selected-flag": {
            backgroundColor: theme.palette.background.default,
        },
        "&.react-tel-input .country-list .search-box": {
            backgroundColor: theme.palette.background.custom2,
            color: theme.palette.neutral[600]
        },
        "&.react-tel-input .country-list .search": {
            backgroundColor: theme.palette.background.custom2,
        },
        "&.react-tel-input .selected-flag": {
            backgroundColor: theme.palette.neutral[300],
            "&:hover": {
                backgroundColor: theme.palette.background.custom2,
            },
        },
        "&.react-tel-input .country-list .country": {
            "&:hover": {
                backgroundColor: theme.palette.background.custom2,
            },
        },
        "&.react-tel-input .country-list": {
            backgroundColor: theme.palette.background.custom2,
        },
        "&.react-tel-input .country-list .country.highlight": {
            backgroundColor: theme.palette.background.default,
        },
        "&.react-tel-input .country-list .country-name": {
            color: theme.palette.neutral[1000],
        },
        "&.react-tel-input .country-list .country .dial-code": {
            color: theme.palette.neutral[400],
        },
        "&.react-tel-input .selected-flag .arrow": {
            right: languageDirection === "rtl" ? "-20px" : "25px",
        },
        "&.react-tel-input .form-control": {
            border: `1px solid ${theme.palette.neutral[200]}`,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.neutral[1000],
            paddingLeft: languageDirection === "rtl" ? "48px" : "48px",
            ...(languageDirection === "rtl" && {
                textAlign: "left",
                direction: "ltr",
                unicodeBidi: "plaintext",
            }),
        },
        "&.react-tel-input .iti__flag-container": {
            left: languageDirection === "rtl" ? "unset" : 0,
            right: languageDirection === "rtl" ? 0 : "unset",
        },
        "&.react-tel-input .iti__selected-flag": {
            left: languageDirection === "rtl" ? 0 : "unset",
            right: languageDirection === "rtl" ? "unset" : 0,
        },
        "&.react-tel-input .iti__selected-flag .iti__arrow": {
            transform:
                languageDirection === "rtl" ? "rotate(180deg)" : "rotate(0deg)",
        },
    })
);
const CustomPhoneInput = ({
                              value,
                              onHandleChange,
                              initCountry,
                              touched,
                              errors,
                              lanDirection,
                              height,
                              borderRadius,
                          }) => {
    const changeHandler = (e) => {
        onHandleChange(e);
    };

    const {t} = useTranslation();
    const defaultCountry = initCountry?.toLowerCase();
    return (
        <NoSsr>
            <CustomStackFullWidth alignItems="flex-start" spacing={0.8}>
                {lanDirection && (
                    <CustomPhoneNumberInputStyled
                        borderRadius={borderRadius}
                        autoFormat={false}
                        placeholder={t("Enter phone number")}
                        value={value}
                        enableSearchField
                        enableSearch
                        onChange={changeHandler}
                        inputProps={{
                            required: true,
                            autoFocus: false,
                        }}
                        specialLabel={t("Phone")}
                        country={defaultCountry}
                        searchStyle={{margin: "0", width: "95%", height: "50px"}}
                        inputStyle={{
                            width: "100%",
                            height: height ? height : "56px",
                            borderRadius: borderRadius ? borderRadius : "5px",
                        }}
                        dropdownStyle={{height: "300px", width: "267px"}}
                        languageDirection={lanDirection}
                        buttonClass={{'background-color': "red"}}
                    />
                )}
                {touched && errors && (
                    <CustomTypography
                        variant="caption"
                        sx={{
                            ml: "10px",
                            fontWeight: "inherit",
                            color: (theme) => theme.palette.error.main,
                        }}
                    >
                        {errors}
                    </CustomTypography>
                )}
            </CustomStackFullWidth>
        </NoSsr>
    );
};
export default CustomPhoneInput;
