import { Box, Stack } from "@mui/system";
import React, { useCallback, useState } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import Menus from "../best-reviewed-items/Menus";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  List,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomPopover from "../../CustomPopover";
import AllStores from "./AllStores";
import MobileMenus from "./MobileMenus";
import NewlyJoined from "./NewlyJoined";
import PopularStores from "./PopularStores";
import TopRatedStores from "./TopRatedStores";
import { t } from "i18next";

const menus = ["All", "Newly Joined", "Popular", "Top Rated"];
const filterLabels = [
  { label: "All", value: "all" },
  { label: "Delivery", value: "delivery" },
  { label: "Take Away", value: "take_away" },
];
const Filter = (props) => {
  const { selectedFilterValue, setSelectedFilterValue } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const mobileLayout = () => {};
  const desktopLayout = () => {
    return (
      <Box sx={{ width: 120, bgcolor: "background.paper" }}>
        <List component="nav" aria-label="main mailbox folders">
          {filterLabels?.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                selected={selectedFilterValue === item?.value}
                onClick={() => setSelectedFilterValue(item?.value)}
              >
                <ListItemText primary={t(item?.label)} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    );
  };
  return (
    <>
      <Button onClick={handleClick} variant="text">
        <FilterAltOutlinedIcon fontSize="small" />
        {isSmall ? null : (
          <>
            <Typography color="customColor.textGray">{t("Filter")}</Typography>
            {open ? (
              <KeyboardArrowUpIcon
                sx={{
                  color: (theme) => theme.palette.customColor.textGray,
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                color="customColor.textGray"
                sx={{
                  color: (theme) => theme.palette.customColor.textGray,
                }}
              />
            )}
          </>
        )}
      </Button>
      {open && (
        <CustomPopover
          openPopover={open}
          anchorEl={anchorEl}
          placement="bottom"
          handleClose={() => setAnchorEl(null)}
          top="10px"
          // left="-230px"
        >
          {isSmall ? mobileLayout() : desktopLayout()}
        </CustomPopover>
      )}
    </>
  );
};
const Stores = (props) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedFilterValue, setSelectedFilterValue] = useState("all");
  const [totalDataCount, setTotalDataCount] = useState(null);
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const stores = t("Stores");
  const handleSelectedMenuIndex = (value) => {
    setSelectedMenuIndex(value);
    setSelectedFilterValue("all");
  };

  const desktopScreenHandler = () => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Menus
          selectedMenuIndex={selectedMenuIndex}
          setSelectedMenuIndex={handleSelectedMenuIndex}
          menus={menus}
        />
        <Filter
          selectedFilterValue={selectedFilterValue}
          setSelectedFilterValue={setSelectedFilterValue}
        />
      </Stack>
    );
  };
  const mobileScreenHandler = () => {
    return (
      <MobileMenus
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={setSelectedMenuIndex}
        selectedFilterValue={selectedFilterValue}
        setSelectedFilterValue={setSelectedFilterValue}
        menus={menus}
      />
    );
  };

  const handleStoresLayout = useCallback(() => {
    if (selectedMenuIndex === 0) {
      return (
        <AllStores
          selectedFilterValue={selectedFilterValue}
          configData={configData}
          totalDataCount={totalDataCount}
          setTotalDataCount={setTotalDataCount}
        />
      );
    } else if (selectedMenuIndex === 1) {
      return (
        <NewlyJoined
          selectedFilterValue={selectedFilterValue}
          configData={configData}
          totalDataCount={totalDataCount}
          setTotalDataCount={setTotalDataCount}
        />
      );
    } else if (selectedMenuIndex === 2) {
      return (
        <PopularStores
          selectedFilterValue={selectedFilterValue}
          configData={configData}
          totalDataCount={totalDataCount}
          setTotalDataCount={setTotalDataCount}
        />
      );
    } else {
      return (
        <TopRatedStores
          selectedFilterValue={selectedFilterValue}
          configData={configData}
          totalDataCount={totalDataCount}
          setTotalDataCount={setTotalDataCount}
        />
      );
    }
  }, [selectedMenuIndex, selectedFilterValue]);
  return (
    <HomeComponentsWrapper sx={{ paddingTop: "1rem" }}>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py="10px"
        pl="20px"
        sx={{
          position: "sticky",
          top: { xs: "55px", md: "63px" },
          zIndex: 100,
          background: (theme) => theme.palette.neutral[300],
        }}
      >
        {totalDataCount ? (
          <H2 text={`${totalDataCount} ${stores}`} />
        ) : (
          <Skeleton variant="text" width="80px" />
        )}

        {isSmall ? mobileScreenHandler() : desktopScreenHandler()}
      </CustomStackFullWidth>
      <CustomBoxFullWidth
        key={selectedFilterValue}
        sx={{
          minHeight: "20vh",
        }}
      >
        {handleStoresLayout()}
      </CustomBoxFullWidth>
    </HomeComponentsWrapper>
  );
};

export default Stores;
