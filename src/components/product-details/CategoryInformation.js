import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Box, Stack } from "@mui/system";
import { alpha, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Tags = ({ item }) => {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        backgroundColor: (theme) =>
          alpha(theme.palette.customColor.textGray, 0.2),
        color: (theme) => theme.palette.customColor.textGray,
        padding: "5px 12px",
      }}
    >
      {item}
    </Box>
  );
};
const CategoryInformation = (props) => {
  const { tags, categories } = props;
  const { t } = useTranslation();
  // const tags = ["t-shit", "V-neck", "cotton"];
  return (
    <CustomStackFullWidth spacing={1.5}>
      {categories?.length > 0 && (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography fontSize={{ xs: "14px", md: "16px" }}>
            {"Category:"}
          </Typography>
          {categories?.map((item, index) => {
            return (
              <Typography
                fontSize="12px"
                color="customColor.textGray"
                key={index}
              >
                {item?.name}
                {categories?.length > 1 &&
                  categories?.length - 1 === index &&
                  ", "}
              </Typography>
            );
          })}
        </Stack>
      )}

      {tags?.length > 0 && (
        <Stack direction="row" alignItems="center" gap="10px" flexWrap="wrap">
          {tags.map((item, index) => {
            return <Tags item={item?.name} key={index} />;
          })}
        </Stack>
      )}
    </CustomStackFullWidth>
  );
};

CategoryInformation.propTypes = {};

export default CategoryInformation;
