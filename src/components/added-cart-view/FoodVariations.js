import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

const VisibleVariations = (props) => {
  const { variations, t, orderDetailsColor } = props;
  const [variationsWithChild, setVariationsWithChild] = useState([]);
  const handleVariationsWithChild = (variations) => {
    const variationsArray = [];
    if (variations?.length > 0) {
      variations.forEach((variation) => {
        if (variation?.values?.length > 0) {
          const selected = variation?.values?.filter(
            (variationValue) => variationValue?.isSelected === true
          );
          if (selected.length > 0) {
            const sArray = {
              variationName: variation?.name,
              variationValues: selected,
            };
            variationsArray.push(sArray);
          }
        }
      });
      setVariationsWithChild(variationsArray);
    }
  };
  useEffect(() => {
    handleVariationsWithChild(variations);
  }, [variations]);
  return (
    <>
      {variationsWithChild.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Typography color="customColor.textGray" fontSize="12px">
            {t("Variation")}
          </Typography>
          <Typography fontSize="12px">:</Typography>
          {variationsWithChild.map((item, parentIndex) => {
            return (
              <Stack direction="row" alignItems="center" key={parentIndex}>
                <Typography
                  orderdetailscolor={orderDetailsColor}
                  fontSize="12px"
                >
                  {item?.variationName}
                </Typography>
                {item?.variationValues?.length > 0 && (
                  <Typography
                    orderdetailscolor={orderDetailsColor}
                    fontSize="12px"
                  >
                    (
                    {item?.variationValues?.map(
                      (val, index) =>
                        `${val.label}${
                          index + 1 !== item.variationValues.length ? "," : ""
                        }`
                    )}
                    )
                    {parentIndex + 1 !== variationsWithChild?.length ? "," : ""}
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Stack>
      )}
    </>
  );
};

VisibleVariations.propTypes = {};

export default VisibleVariations;
