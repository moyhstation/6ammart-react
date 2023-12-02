import React, { useRef, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Stack } from "@mui/system";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomCheckbox from "../../CustomCheckbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const CheckboxWithChild = (props) => {
  const { item, checkHandler, selectedItems } = props;
  const [open, setOpen] = useState(true);
  const clickHandler = () => {
    setOpen((prev) => !prev);
  };
  const isCheckedHandler = (id) => {
    const isExist = selectedItems?.find((item) => item === id);
    return !!isExist;
  };
  return (
    <CustomBoxFullWidth>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CustomCheckbox
          item={item}
          checkHandler={checkHandler}
          isChecked={() => isCheckedHandler(item?.id)}
        />
        {item?.childes?.length > 0 && (
          <>
            {open ? (
              <KeyboardArrowUpIcon
                onClick={clickHandler}
                color="primary"
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <KeyboardArrowDownIcon
                color="primary"
                onClick={clickHandler}
                sx={{ cursor: "pointer" }}
              />
            )}
          </>
        )}
      </Stack>
      {open && (
        <>
          {item?.childes?.map((childItem, childIndex) => (
            <CustomStackFullWidth key={childIndex} sx={{ padding: "0px 16px" }}>
              <CustomCheckbox
                item={childItem}
                checkHandler={checkHandler}
                isChecked={() => isCheckedHandler(childItem?.id)}
              />
            </CustomStackFullWidth>
          ))}
        </>
      )}
    </CustomBoxFullWidth>
  );
};

CheckboxWithChild.propTypes = {};

export default CheckboxWithChild;
