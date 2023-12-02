/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useNewArrivals from "../../../../api-manage/hooks/react-query/product-details/useNewArrivals";
import { CustomBoxFullWidth, CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import ProductCard from "../../../cards/ProductCard";
import H2 from "../../../typographies/H2";
import { HomeComponentsWrapper } from "../../HomePageComponents";
import TabMenu from "../../best-reviewed-items/TabMenu";
import CustomImageContainer from "../../../CustomImageContainer"
import dummyImage from "./assets/Dummy.png"
import MenuSimmer from "../../../Shimmer/MenuSimmer";
import ProductCardSimmer from "../../../Shimmer/ProductCardSimmer";

const NewArrivals = ({ bannerData }) => {
  const [menu, setMenu] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const bannerCount = bannerData?.new_arrival_section_banner ? 8 : 10;
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { data, refetch, isLoading } = useNewArrivals();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.only("sm"));

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setMenu(["All", ...data?.categories?.map((item) => item.name)]);
      setFilteredData(data?.products);
    }
  }, [data]);
  useEffect(() => {
    if (selectedMenuIndex == 0) {
      setFilteredData(data?.products);
    } else {
      setFilteredData(
        data?.products?.filter(
          (item, i) =>
            item.category_id === data.categories[selectedMenuIndex - 1].id
        )
      );
    }
  }, [selectedMenuIndex]);

  const itemArrayManage = (itemArray) => {
    if (isMedium) {
      return itemArray?.slice?.(0, 6);
    } else {
      return itemArray?.slice?.(0, 8);
    }
  };

  const layoutManage = () => {
    if (isSmall) {
      return (
        <HomeComponentsWrapper
          justifyContent="center"
          alignItems="center"
          mt="30px"
        >
          <Grid container spacing={2.5}>
            {/* <Grid item xs={12} sx={{ maxHeight: "600px" }}>
							<CustomImageContainer
								width="100%"
								height="100%"
								objectfit="cover"
								src={dummyImage.src}
								borderRadius="10px"
							/>
						</Grid> */}
            <Grid item xs={12}>
              <CustomStackFullWidth
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {
                  isLoading ? <Skeleton varient="text" width="110px" />
                    :
                    <H2 text="New Arrivals" />
                }
                <ScrollBox>
                  {
                    isLoading ? (
                      <Skeleton varient="rectangular" width="50px" />
                    ) : (
                      menu?.length > 0 && (
                        <TabMenu
                          selectedMenuIndex={selectedMenuIndex}
                          setSelectedMenuIndex={setSelectedMenuIndex}
                          menus={menu}
                        />
                      ))}
                </ScrollBox>
              </CustomStackFullWidth>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              {filteredData?.length > 0 &&
                filteredData?.slice(0, 4).map((product, index) => (
                  <Grid item xs={6} key={product?.id}>
                    <ProductCard
                      item={product}
                      cardheight={isSmall ? "240px" : "290px"}
                      cardFor="vertical"
                      noMargin
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </HomeComponentsWrapper>
      );
    } else {
      return (
        <HomeComponentsWrapper
          justifyContent="center"
          alignItems="center"
          mt="30px"
        >
          {
            isLoading ? <Skeleton varient="text" width="110px" />
              :
              <H2 text="New Arrivals" />
          }
          <CustomStackFullWidth
            justifyContent="center"
            alignItems="center"
            mt="8px"
          >
            <ScrollBox>
              {
                isLoading ? (
                  <MenuSimmer count={12} />
                ) : (
                  menu?.length > 0 && (
                    <TabMenu
                      selectedMenuIndex={selectedMenuIndex}
                      setSelectedMenuIndex={setSelectedMenuIndex}
                      menus={menu}
                    />
                  )

                )
              }
            </ScrollBox>
          </CustomStackFullWidth>
          <Box
            sx={{
              width: "100%",
              mt: ".3rem",
            }}
          >
            <CustomStackFullWidth>
              <Grid container spacing={2}>
                {bannerData?.new_arrival_section_banner &&
                  <Grid item sm={4} md={2.4}>
                    <CustomBoxFullWidth
                      sx={{
                        position: "relative",
                        height: "100%",
                        // paddingTop: "10px",
                      }}
                    >
                      {
                        isLoading ? (
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            height="100%"
                            width="100%"
                          />
                        ) : (
                          <CustomImageContainer
                            width="100%"
                            height="100%"
                            objectfit="contain"
                            src={`${bannerData?.promotional_banner_url}/${bannerData?.new_arrival_section_banner}`}

                          />
                        )
                      }
                    </CustomBoxFullWidth>
                  </Grid>
                }
                {
                  isLoading ? (
                    <Grid item sm={12} md={9.6} container spacing={2}>
                      {[...Array(8)].map((item, index) => {
                        return (
                          <Grid item sm={4} md={3} key={index}>
                            <ProductCardSimmer marginBottom="10px" />
                          </Grid>
                        )
                      })}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      sm={12}
                      md={bannerData?.new_arrival_section_banner ? 9.6 : 12}
                      spacing={2}>
                      {filteredData?.slice(0, bannerCount)?.length > 0 &&
                        itemArrayManage(filteredData).map((product, index) => (
                          <Grid
                            item
                            sm={4}
                            md={bannerData?.new_arrival_section_banner ? 3 : 2.3}
                            key={product?.id}
                          >
                            <ProductCard
                              item={product}
                              cardheight="300px"
                              cardFor="vertical"
                              noMargin
                            // cardFor="popular items"
                            />
                          </Grid>
                        ))}
                      {/* {filteredData?.slice(isMedium ? 6 : 8)?.length > 0 &&
                    filteredData?.slice(isMedium ? 6 : 8)?.map((product) => (
                      <Grid item sm={3} md={2.4} key={product?.id}>
                        <ProductCard
                          item={product}
                          cardheight="300px"
                          cardFor="vertical"
                          noMargin
                          // cardFor="popular items"
                        />
                      </Grid>
                    ))} */}
                    </Grid>
                  )
                }
              </Grid>
            </CustomStackFullWidth>
          </Box>
        </HomeComponentsWrapper>
      );
    }
  };
  return <>{layoutManage()}</>;
};

export const ScrollBox = styled(Box)({
  ".MuiTypography-root": { whiteSpace: "pre" },
  position: "relative",
  zIndex: "3",
});
NewArrivals.propTypes = {};

export default NewArrivals;
