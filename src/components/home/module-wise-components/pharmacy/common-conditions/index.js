import React, { useEffect, useState } from "react";
import { HomeComponentsWrapper } from "../../../HomePageComponents";
import H2 from "../../../../typographies/H2";
import {
  CustomBoxFullWidth,
  CustomFullDivider,
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../../styled-components/CustomStyles.style";
import {
  alpha,
  Grid,
  Skeleton,
  styled,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slider from "react-slick";
import ProductCard from "../../../../cards/ProductCard";
import { Box } from "@mui/system";
import { useGetCommonConditions } from "../../../../../api-manage/hooks/react-query/common-conditions/useGetCommonConditions";
import useGetCommonConditionProducts from "../../../../../api-manage/hooks/react-query/common-conditions/useGetCommonConditionProducts";
import DotSpin from "../../../../DotSpin";
import EmptySearchResults from "../../../../EmptySearchResults";
import { Next, Prev } from "../../../popular-items-nearby/SliderSettings";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const StyledCustomSlider = styled(SliderCustom)(({ theme, active }) => ({
  color: active === "true" ? theme.palette.primary.main : "inherit",
  cursor: "pointer",
  "& .slick-dots": {
    // marginTop: "100px",
    marginBottom: "-40px",
    "& li": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      "& button::before": {
        color: "transparent",
      },
    },
    "& li.slick-active button::before": {
      top: "-2px",
      backgroundColor: theme.palette.primary.main,
      width: "10px",
      height: "10px",
      borderRadius: "50%",
    },
  },
}));

const CommonConditions = (props) => {
  const { title } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [selected, setSelected] = useState(0);
  const [conditionId, setConditionId] = useState(null);
  const page_limit = "20";
  const offset = 1;
  const {
    data: conditions,
    refetch: conditionRefetch,
    isLoading: conditionsIsLoading,
    isRefetching: conditionsIsrefetching,
  } = useGetCommonConditions();

  const { data, refetch, isLoading, isRefetching } =
    useGetCommonConditionProducts({
      conditionId,
      page_limit,
      offset,
    });

  useEffect(() => {
    setConditionId(conditions?.data[0]?.id);
  }, [conditions]);

  useEffect(() => {
    conditionRefetch();
  }, []);

  useEffect(() => {
    if (conditionId) {
      refetch();
    }
  }, [conditionId]);

  const handleClick = (id, index) => {
    setSelected(index);
    setConditionId(id);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    slidesPerRow: 1,
    rows: data?.total_size > 7 ? 2 : 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          rows: data?.total_size > 7 ? 2 : 1,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          rows: data?.total_size > 3 ? 2 : 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          rows: data?.total_size > 4 ? 2 : 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: data?.total_size > 2 ? 2 : 1,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: data?.total_size > 3 ? 2 : 1,
          dots: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
          dots: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 5,
          dots: false,
        },
      },
    ],
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };

  return (
    <HomeComponentsWrapper sx={{ marginTop: "30px", marginBottom: "20px" }}>
      {isLoading ? (
        <Skeleton variant="text" width="110px" />
      ) : (
        <H2 text={title} textAlign="flex-start" />
      )}
      <CustomFullDivider sx={{ marginY: "10px" }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={0} md={3}>
          <CustomStackFullWidth spacing={3}>
            {conditionsIsLoading && conditionsIsrefetching ? (
              <>
                {[...Array(8)].map((item, index) => {
                  return (
                    <Skeleton
                      key={index}
                      variant="text"
                      width={`${Math.floor(Math.random() * 300)}px`}
                    />
                  );
                })}
              </>
            ) : (
              <SimpleBar style={{ maxHeight: "50vh" }}>
                <Tabs
                  orientation={isSmall ? "horizontal" : "vertical"}
                  variant={isSmall && "scrollable"}
                  scrollButtons
                >
                  {conditions?.data?.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        textAlign="flex-start"
                        onClick={() => handleClick(item.id, index)}
                        label={item?.name}
                        sx={{
                          alignItems: "flex-start",
                          marginLeft: isSmall
                            ? "24px !important"
                            : "0px !important",
                          fontSize: selected === index ? "700" : "400",
                          color:
                            selected === index
                              ? "primary.main"
                              : "text.secondary",
                          cursor: "pointer",
                        }}
                      />

                      // <Typography
                      //   textAlign="flex-start"
                      //   variant={selected === index ? "16px" : "subtitle2"}
                      //   lineHeight="16.59px"
                      //   fontWeight={selected === index ? "700" : "400"}
                      //   sx={{
                      //     color:
                      //       selected === index ? "primary.main" : "text.secondary",
                      //     cursor: "pointer",
                      //   }}
                      //   key={item.id}
                      //   onClick={() => handleClick(item.id, index)}
                      // >
                      //   {item?.name}
                      // </Typography>
                    );
                  })}
                </Tabs>
              </SimpleBar>
            )}
          </CustomStackFullWidth>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          {isRefetching ? (
            <CustomStackFullWidth
              sx={{ height: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              <DotSpin />
            </CustomStackFullWidth>
          ) : (
            <>
              {data?.products?.length === 0 ? (
                <CustomStackFullWidth
                  sx={{ height: "100%", padding: "2rem" }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <EmptySearchResults text="Items Not Found!" isItems />
                </CustomStackFullWidth>
              ) : (
                <CustomBoxFullWidth>
                  <StyledCustomSlider>
                    <Slider {...settings}>
                      {data?.products?.length > 0 &&
                        data?.products?.map((item) => (
                          <Box key={item?.id} sx={{ mt: "12px" }}>
                            <ProductCard
                              item={item}
                              cardheight="365px"
                              cardFor="vertical"
                              cardType="vertical-type"
                            />
                          </Box>
                        ))}
                    </Slider>
                  </StyledCustomSlider>
                </CustomBoxFullWidth>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </HomeComponentsWrapper>
  );
};

CommonConditions.propTypes = {};

export default CommonConditions;
