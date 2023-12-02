import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Stack, styled } from "@mui/system";
import { Button, Collapse, Paper, Typography } from "@mui/material";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import Details from "./Details";

import useGetProductReviews from "../../../api-manage/hooks/react-query/product-details/useProductReviews";
import ProductReviews from "../ProductReviews";

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: "16px",
  borderRadius: "5px",
  background: theme.palette.background.paper,
  boxShadow:
    "0px 10px 20px -3px rgba(145, 158, 171, 0.05), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)",
}));

const tabsData = ["Product Details", "Reviews"];

const Tab = ({ item, selected, handleClick }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: (theme) =>
          selected === "true" && theme.palette.primary.main,
        padding: "10px 15px",
        borderRadius: "5px",
        color: (theme) => selected === "true" && theme.palette.neutral[100],
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {item}
    </Stack>
  );
};

const CustomHeader = ({ info }) => {
  const { t } = useTranslation();
  return (
    <CustomStackFullWidth
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        padding: "11px 30px",
        backgroundColor: (theme) => theme.palette.neutral[300],
      }}
    >
      <Typography fontWeight="bold">{t(info)}</Typography>
    </CustomStackFullWidth>
  );
};
const DetailsAndReviews = (props) => {
  const { description, reviews, configData, productId } = props;
  const { t } = useTranslation();
  const [tabs, setTabs] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [offSet, setOffSet] = useState(1);
  const [page_limits, setPageLimits] = useState(10);

  const minHeightToShowButton = 200; // Replace with your specific height threshold
  const { data, refetch } = useGetProductReviews({
    productId,
    offSet,
    page_limits,
  });
  useEffect(() => {
    if (
      contentRef.current &&
      contentRef.current.clientHeight > minHeightToShowButton
    ) {
      setExpanded(true);
    }
  }, [minHeightToShowButton]);
  const handleSeeMore = () => {
    setExpanded(true);
  };
  const handleSeeLess = () => {
    setExpanded(false);
  };

  useEffect(() => {
    refetch();
  }, [productId, offSet]);

  return (
    <Wrapper>
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={0.5}
        >
          {tabsData.map((item, index) => {
            return (
              <Tab
                item={item}
                key={index}
                handleClick={() => setTabs(index)}
                selected={tabs === index ? "true" : "false"}
              />
            );
          })}
        </CustomStackFullWidth>
        <CustomHeader info={tabs === 0 ? "Description" : " Reviews"} />
        <CustomStackFullWidth p="0px 30px">
          {tabs !== 0 && (
            <ProductReviews
              reviews={data?.reviews?.slice(0, 1)}
              configData={configData}
              total_size={data?.total_size}
              offSet={offSet}
              setOffSet={setOffSet}
              page_limits={page_limits}
              isExpanded="true"
            />
          )}
          {tabs === 0 && <Details description={description?.slice(0, 210)} />}
          <Collapse in={expanded}>
            {tabs === 0 ? (
              <Details description={description?.slice(210)} />
            ) : (
              <ProductReviews
                reviews={data?.reviews?.slice(1)}
                configData={configData}
                total_size={data?.total_size}
                offSet={offSet}
                setOffSet={setOffSet}
                page_limits={page_limits}
                isExpanded="false"
              />
            )}
          </Collapse>
          {tabs === 0 ? (
            <>
              {!expanded && description?.length > 110 && (
                <Button
                  sx={{ textDecoration: "underline" }}
                  onClick={handleSeeMore}
                >
                  {t("View More")}
                </Button>
              )}
              {expanded && description?.length > 110 && (
                <Button
                  sx={{ textDecoration: "underline" }}
                  onClick={handleSeeLess}
                >
                  {t("View Less")}
                </Button>
              )}
            </>
          ) : (
            <>
              {!expanded && data?.reviews?.length > 1 && (
                <Button
                  sx={{ textDecoration: "underline" }}
                  onClick={handleSeeMore}
                >
                  {t("View More")}
                </Button>
              )}
              {expanded && data?.reviews?.length > 1 && (
                <Button
                  sx={{ textDecoration: "underline" }}
                  onClick={handleSeeLess}
                >
                  {t("View Less")}
                </Button>
              )}
            </>
          )}
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    </Wrapper>
  );
};

DetailsAndReviews.propTypes = {};

export default DetailsAndReviews;
