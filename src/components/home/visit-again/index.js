import React from "react";
import {
    CustomStackFullWidth,
    SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import H1 from "../../typographies/H1";
import {
    getCurrentModuleId,
    getCurrentModuleType,
} from "../../../helper-functions/getCurrentModuleType";
import Subtitle1 from "../../typographies/Subtitle1";
import Slider from "react-slick";
import { alpha, useTheme } from "@mui/material";
import VisitAgainCard from "../../cards/VisitAgainCard";
import { settings } from "./SliderSettings";
import { IsSmallScreen } from "../../../utils/CommonValues";
import CustomContainer from "../../container";
import { ModuleTypes } from "../../../helper-functions/moduleTypes";

const VisitAgain = (props) => {
    const { configData } = props;
    const theme = useTheme();
    const visitedStores = localStorage.getItem("visitedStores")
        ? JSON.parse(localStorage.getItem("visitedStores"))?.length > 0
            ? JSON.parse(localStorage.getItem("visitedStores"))?.filter(
                (item) => item?.module_id === getCurrentModuleId()
            )
            : []
        : [];
    const getModuleWiseData = () => {
        switch (getCurrentModuleType()) {
            case ModuleTypes.GROCERY:
                return {
                    mainPosition: "flex-start",
                    heading: "Visit Again!",
                    subHeading:
                        "Get your recent purchase from the shop you recently visited",
                    bgColor: alpha(theme.palette.primary.main, 0.2),
                };
            case ModuleTypes.PHARMACY:
                return {
                    mainPosition: "center",
                    heading: "Visit Again!",
                    subHeading:
                        "Get your recent medicine from the store you recently visited",
                    bgColor: alpha(theme.palette.primary.main, 0.2),
                };
            case ModuleTypes.ECOMMERCE:
                return {
                    mainPosition: "flex-start",
                    heading: "Visit Again!",
                    subHeading:
                        "Get your recent purchase from the shop you recently visited",
                    bgColor: alpha(theme.palette.primary.main, 0.2),
                };
            case ModuleTypes.FOOD:
                return {
                    mainPosition: "flex-start",
                    heading: "Wanna Try  Again!",
                    subHeading:
                        "Get your recent food from the restaurant you recently visited",
                    bgColor: alpha(theme.palette.primary.main, 0.2),
                };
        }
    };
    return (
        <>
            {visitedStores?.length > 0 && (
                <CustomStackFullWidth
                    alignItems={getModuleWiseData?.()?.mainPosition}
                    justyfyContent={getModuleWiseData?.()?.mainPosition}
                    mt={IsSmallScreen() ? "2px" : "30px"}
                    spacing={1}
                >
                    {IsSmallScreen() ? (
                        <CustomContainer>
                            <CustomStackFullWidth
                                alignItems={getModuleWiseData?.()?.mainPosition}
                                justyfyContent={getModuleWiseData?.()?.mainPosition}
                                mt="10px"
                                spacing={1}
                            >
                                <H1 text={getModuleWiseData?.()?.heading} />
                                <Subtitle1
                                    textAlign={getModuleWiseData?.()?.mainPosition}
                                    text={getModuleWiseData?.()?.subHeading}
                                />
                            </CustomStackFullWidth>
                        </CustomContainer>
                    ) : (
                        <>
                            <H1 text={getModuleWiseData?.()?.heading} />
                            <Subtitle1 text={getModuleWiseData?.()?.subHeading} />
                        </>
                    )}
                    <SliderCustom
                        nopadding="true"
                        sx={{
                            backgroundColor: getModuleWiseData?.()?.bgColor,
                            padding: { xs: "7px", md: "17px" },
                        }}
                    >
                        <Slider {...settings}>
                            {visitedStores?.reverse()?.map((item, index) => {
                                return (
                                    <VisitAgainCard
                                        key={index}
                                        item={item}
                                        onlyshimmer
                                        configData={configData}
                                    />
                                );
                            })}
                        </Slider>
                    </SliderCustom>
                </CustomStackFullWidth>
            )}
        </>
    );
};

VisitAgain.propTypes = {};

export default VisitAgain;
