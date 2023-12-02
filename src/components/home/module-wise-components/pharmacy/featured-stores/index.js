import React, { useEffect } from "react";
import Slider from "react-slick";
import useGetStoresByFiltering from "../../../../../api-manage/hooks/react-query/store/useGetStoresByFiltering";
import {
  CustomStackFullWidth,
  SliderCustom,
} from "../../../../../styled-components/CustomStyles.style";
import PharmacyFeaturedStoreCard from "../../../../cards/PharmacyFeaturedStoreCard";
import H2 from "../../../../typographies/H2";
import { HomeComponentsWrapper } from "../../../HomePageComponents";
import { settings } from "./SliderSettings";
import { Skeleton } from "@mui/material";
import SpecialOfferCardShimmer from "../../../../Shimmer/SpecialOfferCardSimmer";

const FeaturedStores = (props) => {
  const { title, configData } = props;
  const type = "all";
  const offset = 1;
  const page_limit = 20;
  const pageParams = {
    type,
    offset,
    limit: page_limit,
  };
  const { data, refetch, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetStoresByFiltering(pageParams);
  useEffect(() => {
    refetch();
  }, []);
  let featuredStores = [];
  if (data) {
    if (data?.pages?.length > 0) {
      if (data?.pages?.[0]?.stores?.length > 0) {
        data?.pages?.[0]?.stores?.forEach(
          (item) => item?.featured === 1 && featuredStores.push(item)
        );
      }
    }
  }

  return (
    <HomeComponentsWrapper>
      {data && data?.pages?.length > 0 && featuredStores?.length > 0 && (
        <CustomStackFullWidth
          alignItems="flex-start"
          justyfyContent="flex-start"
        >
          {isLoading ? (
            <Skeleton variant="text" width="110px" />
          ) : (
            <H2 text={title} />
          )}
          <SliderCustom
            nopadding="true"
            sx={{
              "& .slick-slider": {
                "& .slick-list": {
                  paddingY: "16px",
                },
              },
            }}
          >
            {isLoading ? (
              <Slider {...settings}>
                {[...Array(6)].map((item, index) => {
                  return <SpecialOfferCardShimmer key={index} width={290} />;
                })}
              </Slider>
            ) : (
              <Slider {...settings}>
                {featuredStores?.map((item, index) => {
                  const {
                    name,
                    address,
                    logo,
                    cover_photo,
                    total_items,
                    slug,
                    id,
                    module_id,
                    zone_id,
                  } = item;
                  const info = {
                    name,
                    address,
                    logo: `${configData?.base_urls?.store_image_url}/${logo}`,
                    cover_photo: `${configData?.base_urls?.store_cover_photo_url}/${cover_photo}`,
                    total_items,
                    slug,
                    id,
                    module_id,
                    zone_id,
                  };
                  return <PharmacyFeaturedStoreCard data={info} key={index} />;
                })}
              </Slider>
            )}
          </SliderCustom>
        </CustomStackFullWidth>
      )}
    </HomeComponentsWrapper>
  );
};

FeaturedStores.propTypes = {};

export default FeaturedStores;
