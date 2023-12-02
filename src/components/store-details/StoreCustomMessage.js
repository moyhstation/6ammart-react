import React, {useEffect, useState} from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import CustomContainer from "../container";
import StoreMessageSvg from "./assets/store_message.svg";
import {Stack, alpha} from "@mui/system";
import {Box, Typography, useMediaQuery} from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import {useTheme} from '@emotion/react';
import styled from '@emotion/styled';

const BgBox = styled(Box)(({theme, src}) => ({
    backgroundImage: `url(${src})`,
    backgroundPosition: "center",
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    borderRadius: "8px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    border: `1px solid ${theme.palette.secondary.main}`,
    // padding: "20px",
    display: "flex",
    alignItems: "center",
}));


const normalStyle = {
    textAlign: "center"
}
const StoreCustomMessage = ({storeAnnouncement}) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    let duration = (storeAnnouncement?.length * 24) / 100;
    const translateX = isSmall ? ((storeAnnouncement?.length) * 3.5) : ((storeAnnouncement?.length) * 1.3);
    const wordCount = isSmall ? (storeAnnouncement?.length > 35) : (storeAnnouncement?.length > 110);
    // const wordCount = true;

    const animatedStyle = {
        width: "90%",
        paddingInline: "10px",
        whiteSpace: "nowrap",
        animation: `scrollRightToLeft ${duration}s linear infinite`,
        position: "absolute",
        left: "95%",
        transformOrigin: "top left",
        "@keyframes scrollRightToLeft": {
            "0%": {
                transform: "translateX(0%)",
            },
            "100%": {
                transform: `translateX(-${translateX}%)`,
            },
        },
    }

    return (

        <CustomStackFullWidth paddingBlock="20px">
            <BgBox src={StoreMessageSvg.src}>
                <Stack
                    height="60px"
                    position="relative"
                    padding="0px"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                    width="100%"
                >
                    <Stack
                        position="absolute"
                        direction="row"
                        spacing={{xs: 1, md: 2}}
                        sx={wordCount ? animatedStyle : normalStyle}

                    >
                        <CampaignIcon color="primary" style={{width: "30px", height: "30px"}}/>
                        <Typography
                            fontSize="16px"
                            fontWeight="500"
                            textTransform="capitalize"
                        >
                            {storeAnnouncement}</Typography>
                    </Stack>
                    {/* <StoreMessageSvg /> */}
                </Stack>
            </BgBox>
        </CustomStackFullWidth>

    );
};

export default StoreCustomMessage;


// import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
// import CustomContainer from "../container";
// import StoreMessageSvg from "./assets/store_message.svg";
// import { Stack, alpha } from "@mui/system";
// import { Box, Typography } from "@mui/material";
// import CampaignIcon from '@mui/icons-material/Campaign';
// import { useTheme } from '@emotion/react';
// import styled from '@emotion/styled';
// import { useEffect, useState } from "react";

// const BgBox = styled(Box)(({ theme, src }) => ({
//     backgroundImage: `url(${src})`,
//     backgroundPosition: "center",
//     backgroundColor: alpha(theme.palette.secondary.main, 0.1),
//     borderRadius: "8px",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "contain",
//     border: `1px solid ${theme.palette.secondary.main}`,
//     display: "flex",
//     alignItems: "center",
// }));

// // const animatedStyle = {
// //     width: "90%",
// //     paddingInline: "10px",
// //     whiteSpace: "nowrap",
// //     position: "absolute",
// //     left: "95%",
// //     transformOrigin: "top left",
// //     animation: "scrollRightToLeft 5s linear infinite",
// //     "@keyframes scrollRightToLeft": {
// //         "0%": {
// //             transform: "translateX(0%)",
// //         },
// //         "100%": {
// //             transform: "translateX(-200%)",
// //         }
// //     },
// // };

// const animatedStyle = {

// }

// const normalStyle = {
//     textAlign: "center"
// };


// const StoreCustomMessage = ({ storeAnnouncement }) => {
//     // const storeAnnouncement = "aaaaaaaaaa"
//     // const storeAnnouncement = "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"
//     const theme = useTheme();
//     const wordCount = storeAnnouncement?.length > 110 ? true : false;
//     const [shouldAnimate, setShouldAnimate] = useState(wordCount);

//     useEffect(() => {
//         if (shouldAnimate) {
//             const animationDuration = 35000; // 25 seconds
//             setTimeout(() => {
//                 setShouldAnimate(false); // Stop the animation after the specified time
//             }, animationDuration);
//         }
//     }, [shouldAnimate]);

//     return (
//         <CustomStackFullWidth padding="20px">
//             <BgBox src={StoreMessageSvg.src}>
//                 <Stack
//                     height="60px"
//                     position="relative"
//                     padding="0px"
//                     justifyContent="center"
//                     alignItems="center"
//                     overflow="hidden"
//                     width="100%"
//                 >
//                     <Stack
//                         position="absolute"
//                         direction="row"
//                         spacing={{ xs: 1, md: 2 }}
//                         // sx={wordCount ? animatedStyle : normalStyle}
//                         sx={{
//                             width: "100%",
//                             whiteSpace: "nowrap",
//                             overflowX: "auto",
//                             cursor: "grab",
//                             scrollbarWidth: "none",
//                             "-ms-overflow-style": "none",
//                             "&::-webkit-scrollbar": {
//                                 display: "none"
//                             }
//                         }}
//                     >
//                         <CampaignIcon color="primary" style={{ width: "30px", height: "30px" }} />
//                         <Typography fontSize="16px" fontWeight="500" textTransform="capitalize">
//                             {storeAnnouncement}
//                         </Typography>
//                     </Stack>
//                 </Stack>
//             </BgBox>
//         </CustomStackFullWidth>
//     );
// };

// export default StoreCustomMessage;
