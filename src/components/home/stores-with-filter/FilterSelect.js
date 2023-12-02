import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import PropTypes from "prop-types";

const CustomBox = styled(Box)(({ theme }) => ({
  padding: "8px",
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "8px",
  width: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    borderRadius: "50%",
  },
}));

const FilterSelect = (props) => {
  const { setType } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("all");
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedItem) => {
    setValue(selectedItem);
    setType(selectedItem);
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <CustomBox onClick={handleClick}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterListIcon />
          {!isSmall && (
            <>
              <Typography>{t("Filter By")}</Typography>:
              <Typography textTransform="capitalize">{t(value)}</Typography>
            </>
          )}
        </Stack>
      </CustomBox>
      <Menu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("all")}>{t("All")}</MenuItem>
        <MenuItem onClick={() => handleClose("delivery")}>
          {t("Delivery")}
        </MenuItem>
        <MenuItem onClick={() => handleClose("take away")}>
          {t("Take Away")}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterSelect;
