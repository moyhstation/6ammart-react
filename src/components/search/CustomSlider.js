import React, { useEffect, useState } from "react";
import { Slider, Stack, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useIsMount } from "../first-render-useeffect-controller/useIsMount";

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-rail": {
    height: "5px",
    marginLeft: "10px",
    backgroundColor: theme.palette.neutral[600],
  },
  "& .MuiSlider-thumb": {
    backgroundColor: theme.palette.neutral[100],
    border: `4px solid ${theme.palette.primary.main}`,
    boxShadow: "0px 2px 4px rgba(9, 87, 203, 0.15)",
  },
}));
const CustomSlider = ({ handleChangePrice, minMax, priceFilterRange }) => {
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const [value, setValue] = useState(
    filterData.price !== "" ? filterData.price : minMax ? minMax : [0, 1]
  );
  const minDistance = 1;
  const isMount = useIsMount();
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  useEffect(() => {
    if (isMount) {
      //for doing nothing on first render
    } else {
      handleChangePrice(value);
    }
  }, [value]);
  return (
    <Stack
      direction="row"
      sx={{ mb: 1, ml: 1 }}
      alignItems="center"
      spacing={1}
      px=".7rem"
    >
      <StyledSlider
        // key={minMax}
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disabled={priceFilterRange?.min_price === priceFilterRange?.max_price}
        min={priceFilterRange ? priceFilterRange?.min_price : 0}
        max={priceFilterRange ? priceFilterRange?.max_price : 1000}
        marks={[{ value: 0 }, { value: 100 }]}
        // getAriaValueText={valuetext}
        disableSwap
      ></StyledSlider>
    </Stack>
  );
};

export default CustomSlider;
