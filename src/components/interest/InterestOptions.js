import React, { useEffect, useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";

import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
// import { usePostSelectedCategory } from '../../hooks/react-query/interest/usePostSelectedCategory'
import Router from "next/router";
// import { onErrorResponse } from '../ErrorResponse'
import { toast } from "react-hot-toast";
import InterestShimmer from "./InterestShimmer";
import { useGetCategories } from "../../api-manage/hooks/react-query/all-category/all-categorys";
import { usePostSelectedCategory } from "../../api-manage/hooks/react-query/all-category/usePostSelectedCategory";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import H1 from "../typographies/H1";

const InterestOptions = ({ configData }) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const onSuccessHandler = (response) => {
    setCategoryList(response?.data);
  };
  let searchKey = "";
  let queryKey = "";
  const { refetch } = useGetCategories(searchKey, onSuccessHandler, queryKey);

  useEffect(() => {
    refetch();
  }, []);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleItemClick = (item) => {
    //state manipulation with select deselect
    const isItemAlreadyExist = selectedId.find((id) => id === item.id);
    if (isItemAlreadyExist) {
      const newArray = selectedId.filter((id) => id !== item.id);
      setSelectedId(newArray);
    } else {
      setSelectedId((prevState) => [...prevState, item.id]);
    }
  };
  const handleBorder = (itemId) => {
    const isExist = selectedId.find((item) => item === itemId);
    return !!isExist;
  };
  //post handle
  const { mutate, isLoading } = usePostSelectedCategory();
  const handleSubmit = () => {
    mutate(
      { interest: selectedId },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          Router.push("/home", undefined, { shallow: true });
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };
  return (
    <CustomStackFullWidth
      spacing={1}
      alignItems="center"
      justifyContent="center"
      mt="2rem"
    >
      <H1 text="Choose Your Interests" />
      <Typography variant="h6" color="customColor.textGray">
        {t("Get personalized food recommendations.")}
      </Typography>
      <Grid container spacing={2}>
        {categoryList.length > 0 ? (
          categoryList.map((item, index) => {
            return (
              <Grid
                key={index}
                onClick={() => handleItemClick(item)}
                item
                xs={6}
                sm={3}
                md={2}
                lg={2}
                align="center"
                sx={{
                  cursor: "pointer",
                }}
              >
                <CustomPaperBigCard
                  padding=".5rem"
                  sx={{
                    border: handleBorder(item.id) && "2px solid",
                    borderColor: handleBorder(item.id) && "primary.main",
                    div: {
                      borderRadius: "8px",
                      overflow: "hidden",
                    },
                    "&:hover": {
                      img: {
                        transform: "scale(1.14)",
                      },
                    },
                  }}
                >
                  <CustomStackFullWidth spacing={1}>
                    <CustomImageContainer
                      height={isSmall ? "100px" : "150px"}
                      width="100%"
                      src={`${configData?.base_urls?.category_image_url}/${item.image}`}
                    />
                    <CustomTypography>{item.name}</CustomTypography>
                  </CustomStackFullWidth>
                </CustomPaperBigCard>
              </Grid>
            );
          })
        ) : (
          <InterestShimmer />
        )}
        <Grid item xs={12} md={12} align="center">
          <LoadingButton
            disabled={selectedId.length === 0}
            loading={isLoading}
            variant="contained"
            sx={{
              marginTop: "1rem",
              width: { xs: "auto", sm: "200px" },
            }}
            onClick={() => handleSubmit()}
          >
            {t("Save")}
          </LoadingButton>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

InterestOptions.propTypes = {};

export default InterestOptions;
