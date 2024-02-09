import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import { getModuleId } from "../../../helper-functions/getModuleId";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import ViewMore from "./ViewMore";
import CustomDivider from "../../CustomDivider";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
    padding: ".5rem",
  },
}));

const GridItem = ({
  category,
  handleClick,
  handleClickToSubCategory,
  hasChildLength,
  index,
}) => {
  return (
    <Box maxWidth="150px">
      <Typography
        onClick={() => handleClick(category)}
        fontSize=".8rem"
        fontWeight="500"
        sx={{
          mb:
            category?.childes?.length > 0
              ? "1.8rem"
              : hasChildLength()?.length === 0
                ? ".7rem"
                : "1.4rem",
          cursor: "pointer",
          transition: "all ease 0.5s",
          mt: hasChildLength()?.length === 0 && index !== 0 && ".7rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
          "&:hover": {
            color: "primary.main",
            letterSpacing: "0.03em",
          },
        }}
      >
        {category?.name}
      </Typography>
      {category?.childes?.length > 0 &&
        category?.childes?.slice(0, 5).map((item, index) => {
          return (
            <Typography
              key={index}
              sx={{
                mb: "1rem",
                cursor: "pointer",
                fontSize: "0.75rem",
                color: (theme) => theme.palette.neutral[500],
                transition: "all ease 0.5s",
                "&:hover": {
                  color: "primary.main",
                  letterSpacing: "0.03em",
                },
              }}
              onClick={() => handleClickToSubCategory(item)}
            >
              {item?.name}
            </Typography>
          );
        })}
    </Box>
  );
};

const CategoryPopover = ({
  handlePopoverOpenSub,
  catImageUrl,
  openSub,
  anchorElSub,
  subCategory,
  shimmer,
  handlePopoverCloseSub,
  categories,
}) => {
  const searchKey = "";
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const primaryColor = theme.palette.primary.main;
  const handleClick = (item) => {
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: item?.id,
        module_id: `${getModuleId()}`,
        name: btoa(item?.name),
      },
    });
    handlePopoverCloseSub?.();
  };
  const handleClickToSubCategory = (item) => {
    router.push({
      pathname: "/home",
      query: {
        search: "category",
        id: item?.id,
        module_id: `${getModuleId()}`,
        name: btoa(item?.name),
      },
    });
    handlePopoverCloseSub?.();
  };
  const getGridSize = (length) => {
    switch (length) {
      case 1:
        return 6;
      case 2:
        return 4;
      case 3:
        return 3;
      case 4:
        return 2.4;
      case 5:
        return 2.4;
      default:
        return 12;
    }
  };

  const hasChildLength = () => {
    return categories
      ?.slice?.(0, 5)
      ?.filter((item) => item?.childes?.length > 0 && item);
  };
  return (
    <Box
      sx={{
        padding: "2rem",
        // width: { md: "1123px", lg: "1000px" },
        minWidth: "253px",
      }}
    >
      <Grid container spacing={3}>
        {categories?.slice?.(0, 5)?.map((item, index) => {
          if (item?.childes?.length > 0) {
            return (
              <Grid item xs={getGridSize(hasChildLength()?.length)} key={index}>
                <CustomStackFullWidth
                  justifyContent="space-between"
                  sx={{ height: "100%" }}
                >
                  <GridItem
                    category={item}
                    handleClick={handleClick}
                    handleClickToSubCategory={handleClickToSubCategory}
                    hasChildLength={hasChildLength}
                  />
                  {index === 0 && (
                    <ViewMore
                      redirect="/categories"
                      handlePopoverCloseSub={handlePopoverCloseSub}
                      buttonType="contained"
                    />
                  )}
                </CustomStackFullWidth>
              </Grid>
            );
          }
        })}
        <Grid item xs={getGridSize(hasChildLength()?.length)}>
          {categories?.slice?.(0, 5)?.map((item, index) => {
            if (item?.childes?.length === 0) {
              return (
                <CustomStackFullWidth
                  justifyContent="space-between"
                  key={item?.id}
                >
                  <GridItem
                    hasChildLength={hasChildLength}
                    category={item}
                    handleClick={handleClick}
                    handleClickToSubCategory={handleClickToSubCategory}
                    index={index}
                  />
                  {hasChildLength()?.length === 0 && (
                    <CustomDivider border="1px" />
                  )}
                  {index === 0 && hasChildLength()?.length !== 0 && (
                    <ViewMore
                      redirect="/categories"
                      handlePopoverCloseSub={handlePopoverCloseSub}
                      buttonType="contained"
                    />
                  )}
                </CustomStackFullWidth>
              );
            }
          })}
          {hasChildLength()?.length === 0 && (
            <Stack mt="1.4rem">
              <ViewMore
                redirect="/categories"
                handlePopoverCloseSub={handlePopoverCloseSub}
                buttonType="contained"
              />
            </Stack>
          )}
        </Grid>

        {/*<Grid item md={3}>*/}
        {/*	<CustomImageContainer*/}
        {/*		src={bg.src}*/}
        {/*		height="240px"*/}
        {/*		width="100%"*/}
        {/*		obejctfit="contain"*/}
        {/*	/>*/}
        {/*</Grid>*/}
      </Grid>
    </Box>
  );
};

export default CategoryPopover;
