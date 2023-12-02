import {alpha, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/system";
import React, {useReducer} from "react";

import {useSelector} from "react-redux";
import {
    CustomBoxFullWidth,
    CustomSpan,
    CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../../CustomImageContainer";
import CustomLinearProgressbar from "../../../linear-progressbar";
import AmountWithDiscountedAmount from "../../../AmountWithDiscountedAmount";
import {getCurrentModuleType} from "../../../../helper-functions/getCurrentModuleType";
import {ModuleTypes} from "../../../../helper-functions/moduleTypes";
import H4 from "../../../typographies/H4";
import {FoodVegNonVegFlag} from "../../../cards/SpecialCard";
import {t} from "i18next";
import CustomBadge from "../../../cards/CustomBadge";
import {getAmountWithSign} from "../../../../helper-functions/CardHelpers";

const Slide = ({item}) => {
    const [dispatch] = useReducer();
    const p_off = t("%");
    const theme = useTheme();
    const {configData} = useSelector((state) => state.configData);
    const imageBaseUrl = configData?.base_urls?.item_image_url;

    const getModuleWiseItemName = () => {
        if (getCurrentModuleType() === ModuleTypes.FOOD) {
            return (
                <Stack direction="row" alignItems="center" spacing={0.8}>
                    <H4 text={item?.item?.name}/>
                    <FoodVegNonVegFlag veg={item?.item?.veg == 0 ? false : true}/>
                </Stack>
            );
        } else {
            return (
                <Stack direction="row" alignItems="center" spacing={0.8}>
                    <H4
                        text={`${item?.item?.name.slice(0, 25)} (${item?.item?.unit_type})`}
                    />
                </Stack>
            );
        }
    };

    const handleBadge = () => {
        if (Number.parseInt(item?.item?.store_discount) === 0) {
            if (Number.parseInt(item?.item?.discount) > 0) {
                if (item?.item?.discount_type === "percent") {
                    return <CustomBadge top={10} text={`${item?.item?.discount}${p_off}`}/>;
                } else {
                    return (
                        <CustomBadge
                            top={10}
                            text={`${getAmountWithSign(item?.item?.discount)}`}
                        />
                    );
                }
            }
        } else {
            if (Number.parseInt(item?.item?.store_discount) > 0) {
                return (
                    <CustomBadge top={10} text={`${item?.item?.store_discount}${p_off}`}/>
                );
            }
        }
    };

    return (
        <CustomStackFullWidth>
            <CustomBoxFullWidth
                sx={{
                    height: "260px",
                    backgroundColor: (theme) => theme.palette.neutral[100],
                    borderRadius: "10px",
                    position: "relative",
                }}
            >
                {handleBadge()}
                <CustomImageContainer
                    height="100%"
                    width="100%"
                    src={`${imageBaseUrl}/${item?.item?.image}`}
                    objectFit="cover"
                />
            </CustomBoxFullWidth>
            <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                sx={{
                    paddingX: {xs: "40px", md: "20px"},
                }}
            >
                <Stack mt="15px" spacing={1}>
                    <Stack
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {item?.available_stock === 0 ? (
                            <Typography
                                variant="h5"
                                display="flex"
                                alignItems="center"
                                flexWrap="wrap"
                                gap="5px"
                                sx={{
                                    fontSize: {xs: "13px", sm: "18px"},
                                    color: alpha(theme.palette.error.deepLight, 0.7),
                                }}
                            >{t("Out of Stock")}</Typography>
                        ) : (
                            <AmountWithDiscountedAmount item={item?.item} noPrimaryColor/>
                        )}
                    </Stack>
                    {getModuleWiseItemName()}
                </Stack>
                <CustomStackFullWidth mt="100px" spacing={1}>
                    <CustomLinearProgressbar value={(item?.sold / item?.stock) * 100}/>
                    <CustomStackFullWidth
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography fontWeight="bold" lineHeight="28px" variant="body2">
                            <CustomSpan>{t("Sold")}</CustomSpan> : {item?.sold} {t("items")}
                        </Typography>
                        <Typography fontWeight="bold" lineHeight="28px" variant="body2">
                            <CustomSpan>{t("Available")}</CustomSpan> : {item?.available_stock} {t("items")}
                        </Typography>
                    </CustomStackFullWidth>
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    );
};

Slide.propTypes = {};

export default Slide;
