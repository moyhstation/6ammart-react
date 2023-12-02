import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import CustomImageContainer from "../../CustomImageContainer";

import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { getModuleId } from "../../../helper-functions/getModuleId";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import ViewMore from "./ViewMore";
import bg from "./assets/bg.png";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
    padding: ".5rem",
  },
}));

const GridItem = ({ category, handleClick, handleClickToSubCategory }) => {
  return (
    <Box>
      <Typography
        onClick={() => handleClick(category)}
        fontSize=".8rem"
        fontWeight="500"
        sx={{
          mb: "1.8rem",
          cursor: "pointer",
          transition: "all ease 0.5s",
          "&:hover": {
            color: "primary.main",
            letterSpacing: "0.03em",
          },
        }}
      >
        {category?.name}
      </Typography>
      {category?.childes?.length > 0 &&
        category?.childes?.map((item, index) => {
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
        id:  item?.id,
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
  return (
    <Box
      sx={{
        padding: "2rem",
        width: { md: "1123px", lg: "1000px" },
      }}
    >
      <Grid container spacing={4}>
        <Grid item container md={12} spacing={2}>
          {categories?.slice?.(0, 5)?.map((item, index) => {
            return (
              <Grid item xs={2.4} key={index}>
                <CustomStackFullWidth
                  justifyContent="space-between"
                  sx={{ height: "100%" }}
                >
                  <GridItem
                    category={item}
                    handleClick={handleClick}
                    handleClickToSubCategory={handleClickToSubCategory}
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
          })}
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
