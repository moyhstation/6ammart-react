import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { CustomBoxFullWidth } from "../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Chip } from "@mui/material";

const ItemSelectWithChip = (props) => {
  const { title, data, handleChange } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickItem = (value) => {
    setSelected(value);
    setAnchorEl(null);
    handleChange?.(value);
  };
  const handleDelete = () => {
    setSelected(null);
    handleChange?.(null);
  };
  return (
    <CustomBoxFullWidth>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 2px",
          textTransform: "capitalize",
        }}
      >
        {t(title)}
        {open ? (
          <KeyboardDoubleArrowDownIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </Button>
      {data?.length > 0 && (
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {data?.map((item, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => handleClickItem(item)}
                sx={{ textTransform: "capitalize" }}
              >
                {item}
              </MenuItem>
            );
          })}
        </Menu>
      )}
      {selected && (
        <Chip
          sx={{ mt: "10px", ml: "15px" }}
          label={t(selected)}
          onDelete={handleDelete}
        />
      )}
    </CustomBoxFullWidth>
  );
};

export default ItemSelectWithChip;
