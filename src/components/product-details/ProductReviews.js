import React, { useRef } from "react";
import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import { useTheme } from "@mui/material";
import ProductReviewCard from "./product-details-section/ProductReviewCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { t } from "i18next";
import CustomPagination from "../custom-pagination";

const ProductReviews = ({
  reviews,
  configData,
  offSet,
  total_size,
  setOffSet,
  page_limits,
  isExpanded,
}) => {
  const theme = useTheme();
  const SliderRef = useRef(null);

  return (
    <>
      <CustomBoxFullWidth>
        {reviews?.length > 0 ? (
          reviews?.map((review) => {
            return (
              <ProductReviewCard
                key={review?.id}
                review={review}
                configData={configData}
              />
            );
          })
        ) : (
          <>{isExpanded === "true" && t("No reviews found")}</>
        )}
        {reviews?.length > 1 && (
          <CustomPagination
            total_size={total_size}
            page_limit={page_limits}
            offset={offSet}
            setOffset={setOffSet}
          />
        )}
      </CustomBoxFullWidth>
    </>
  );
};

export default ProductReviews;
