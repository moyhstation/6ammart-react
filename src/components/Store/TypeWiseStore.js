import React, { useEffect, useState } from "react";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import StoreList from "./StoreList";
import useGetTypeWiseStore from "../../api-manage/hooks/react-query/typewise-store/useGetTypeWiseStore";
import { useRouter } from "next/router";
import useGetPopularStore, {
  useGetPopularStoreWithoutInfiniteScroll,
} from "../../api-manage/hooks/react-query/store/useGetPopularStore";
import { Box } from "@mui/system";
import Shimmer from "../home/stores-with-filter/Shimmer";

const TypeWiseStore = ({ storeType, title }) => {
  const [type, setType] = useState("all");
  const { data, refetch, isLoading } = useGetTypeWiseStore(storeType, type);
  const queryKey = "navbar-stores";
  const router = useRouter();
  const {
    data: popularData,
    refetch: popularRefetch,
    isLoading: popularIsLoading,
  } = useGetPopularStoreWithoutInfiniteScroll({ queryKey, type });
  useEffect(() => {
    if (storeType === "latest") {
      refetch();
    } else {
      popularRefetch();
    }
  }, [type]);

  const renderShimmer = () => (
    <Box marginTop="40px">
      <Shimmer count="10" />
    </Box>
  );
  const renderStoreList = (itemsData) => (
    <StoreList
      storeType={storeType}
      type={type}
      setType={setType}
      data={itemsData}
    />
  );

  const handleStoreList = () => {
    if (storeType === "latest") {
      if (isLoading) {
        return <>{renderShimmer()}</>;
      } else {
        if (data?.stores?.length > 0) {
          return <>{renderStoreList(data?.stores)}</>;
        }
      }
    } else {
      if (popularIsLoading) {
        return <>{renderShimmer()}</>;
      } else {
        if (popularData?.stores?.length > 0) {
          return <>{renderStoreList(popularData?.stores)}</>;
        }
      }
    }
  };

  return (
    <>
      <CustomPaperBigCard>
        <H1 text={title} textAlign="left" />
        {handleStoreList()}
      </CustomPaperBigCard>
    </>
  );
};

export default TypeWiseStore;
