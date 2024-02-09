import React, {forwardRef, useEffect, useState} from "react";
import {CustomBoxFullWidth, CustomStackFullWidth,} from "../../styled-components/CustomStyles.style";
import {Grid, Skeleton, Stack} from "@mui/material";
import SearchFilter from "./search-filter";
import ProductCard, {CardWrapper} from "../cards/ProductCard";
import StoreCard from "../cards/StoreCard";
import DotSpin from "../DotSpin";
import EmptySearchResults from "../EmptySearchResults";
import AppliedFilters from "./AppliedFilters";

// eslint-disable-next-line react/display-name
const SideBarWithData = forwardRef((props, ref) => {
    const {
        searchValue,
        pageData,
        setPageData,
        isLoading,
        id,
        currentTab,
        configData,
        isFetchingNextPage,
        currentView,
        isInitialRefetching,
        filterData,
        setFilterData,
        selectedCategoriesHandler,
        isApiCalling,
        searchCall,
        isFetchingSearchAPi,
        isLoadingSearch,
        isLoadingCategory,
        allItemsLoading,
        storeLoading,
        fromAllCategories,
        specialOfferLoading,
    } = props;

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Use setTimeout to set the state to true after 1 second (1000 milliseconds)
        const timeoutId = setTimeout(() => {
            setLoading(true);
        }, 5000);
        // Clear the timeout if the component unmounts before it fires
        return () => clearTimeout(timeoutId);
    }, []);

    const getProductShimmer = () => (
        <Grid item xs={12} sm={4} md={3}>
            <CardWrapper sx={{height: "250px"}}>
                <Stack spacing={1}>
                    <Skeleton variant="rectangular" animation="pulse" height={150}/>
                    <Stack alignItems="center" justifyContent="center" padding="1rem">
                        <Skeleton variant="text" animation="wave" height={20} width="80%"/>
                        <Skeleton variant="text" animation="wave" height={20}/>
                        <Skeleton variant="text" animation="wave" height={20} width="80%"/>
                    </Stack>
                </Stack>
            </CardWrapper>
        </Grid>
    );
    const getLayoutHandler = () => {
        if (currentTab === 0) {
            return (
                <>
                    {currentView === 0 ? (
                        <>
                            {pageData?.length > 0 && (
                                <>
                                    {pageData?.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={6} sm={4} md={3}>
                                                <ProductCard
                                                    key={item?.id}
                                                    item={item}
                                                    cardheight="318px"
                                                    cardFor="vertical"
                                                    cardType="vertical-type"
                                                    // cardFor="popular items"
                                                />
                                            </Grid>
                                        );
                                    })}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {pageData?.length > 0 && (
                                <>
                                    {pageData?.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={12} sm={6} md={6}>
                                                <ProductCard
                                                    key={item?.id}
                                                    item={item}
                                                    cardheight="150px"
                                                    cardType="vertical-type"
                                                    horizontalcard="true"
                                                    cardFor="list-view"
                                                    // cardFor="popular items"
                                                />
                                            </Grid>
                                        );
                                    })}
                                </>
                            )}
                        </>
                    )}
                </>
            );
            // if (isLoading) {
            //   return (
            //     <>
            //       {[...Array(4)].map((item, index) => {
            //         return <>{getProductShimmer()}</>;
            //       })}
            //     </>
            //   );
            // } else {
            //
            // }
        } else {
            return (
                <>
                    {pageData?.length > 0 && (
                        <>
                            {pageData?.map((item, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={4} md={4}>
                                        <StoreCard
                                            item={item}
                                            imageUrl={`${configData?.base_urls?.store_cover_photo_url}/${item?.cover_photo}`}
                                        />
                                    </Grid>
                                );
                            })}
                        </>
                    )}
                </>
            );
        }
    };

    const emptyHandler = () => {
        if (!isApiCalling && loading && !isLoading) {

            if (fromAllCategories === "allCategories") {
                if (pageData?.length === 0) {
                    if (currentTab === 0) {
                        return <EmptySearchResults text="Items not found!"/>;
                    } else {
                        return <EmptySearchResults text="Stores not found!"/>;
                    }
                }
            } else {
                if (pageData === undefined) {
                    if (currentTab === 0) {
                        return <EmptySearchResults text="Items not found!"/>;
                    } else {
                        return <EmptySearchResults text="Stores not found!"/>;
                    }
                }
            }
        }
    };

    return (
        <CustomBoxFullWidth sx={{marginTop: "20px"}}>
            <Grid container>
                <Grid item xs={0} sm={0} md={0} lg={3}>
                    <SearchFilter
                        searchValue={searchValue}
                        id={id}
                        selectedCategoriesHandler={selectedCategoriesHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={9} spacing={2.5}>
                    <CustomStackFullWidth spacing={2} sx={{paddingTop: "1rem"}}>
                        <AppliedFilters
                            filterData={filterData}
                            setFilterData={setFilterData}
                        />
                        <CustomBoxFullWidth>
                            <Grid container spacing={2} ref={ref}>
                                {isLoading &&
                                loading &&
                                !storeLoading &&
                                !isLoadingSearch &&
                                !specialOfferLoading ? (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        sx={{
                                            paddingBlockEnd: "30px",
                                            paddingBlockStart: "30px",
                                        }}
                                    >
                                        <Stack sx={{marginTop: "2rem"}}>
                                            <DotSpin/>
                                        </Stack>
                                    </Grid>
                                ) : (
                                    getLayoutHandler()
                                )}
                                {(isApiCalling || !loading) && (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        sx={{
                                            paddingBlockEnd: "30px",
                                            paddingBlockStart: "30px",
                                        }}
                                    >
                                        <Stack sx={{marginTop: "2rem"}}>
                                            <DotSpin/>
                                        </Stack>
                                    </Grid>
                                )}
                                {emptyHandler()}
                            </Grid>
                        </CustomBoxFullWidth>
                    </CustomStackFullWidth>
                </Grid>
            </Grid>
        </CustomBoxFullWidth>
    );
});

SideBarWithData.propTypes = {};

export default SideBarWithData;
