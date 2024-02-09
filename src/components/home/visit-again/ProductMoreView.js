import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { Box } from "@mui/system";
import { alpha } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getModuleWiseData,
  ImageWrapperMore,
} from "../../cards/VisitAgainCard";

const ProductMoreView = ({ products, width, height, justifyContent }) => {
  const { configData } = useSelector((state) => state.configData);
  return (
    <>
      {products?.length > 0 && (
        <CustomStackFullWidth
          direction="row"
          flexWrap="wrap"
          justifyContent={justifyContent ?? "flex-start"}
          gap={getModuleWiseData?.()?.smallImageGap}
        >
          {products.map((item, index) => {
            if (index < 3) {
              return (
                <ImageWrapperMore
                  width={width}
                  height={height}
                  key={index}
                  margin_left={
                    getModuleWiseData?.()?.smallImageMarginLeft === "true"
                      ? index !== 0
                        ? "true"
                        : "false"
                      : "false"
                  }
                  is_border={getModuleWiseData?.()?.border}
                >
                  <CustomImageContainer
                    src={`${configData?.base_urls?.item_image_url}/${item?.image || item
                      }`}
                    alt={item?.name}
                    height="100%"
                    width="100%"
                    obejctfit="contained"
                    borderRadius={getModuleWiseData?.()?.borderRadiusSmallImage}
                  />
                </ImageWrapperMore>
              );
            }
          })}
          {products?.length > 3 && (
            <Box
              sx={{
                marginLeft:
                  getModuleWiseData?.()?.smallImageMarginLeft === "true"
                    ? "-5px"
                    : "0px",
                height: { xs: "21px", sm: "30px" },
                width: { xs: "21px", sm: "30px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: getModuleWiseData?.()?.borderRadiusSmallImage,
                fontSize: "10px",
                fontWeight: "700",
                // paddingLeft: "3px",
                color: "whiteContainer.main",
                backgroundColor: (theme) =>
                  alpha(theme.palette.neutral[600], 0.4),
              }}
            >
              + {products?.length - 3}
            </Box>
          )}
        </CustomStackFullWidth>
      )}
    </>
  );
};

export default ProductMoreView;
