import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, FormControlLabel } from "@mui/material";
import { FoodTitleTypography } from "../food-card/FoodCard.style";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { CustomTypographyLabel } from "../../../styled-components/CustomTypographies.style";
// import { CustomTypographyLabel } from '../../styled-components/CustomTypographies.style'

const VariationButtons = ({ modalData, changeChoices }) => {
  const [value, setValue] = useState(
    modalData[0].choice_options.map((i) => ({
      type: i.title,
      value: i.options[0],
    }))
  );
  const [choice, setChoice] = useState(null);
  const handleChange = (event, index, choice) => {
    setValue((prev) => {
      prev[index].value = event.target.value;
      return [...prev];
    });
    setChoice(choice);
  };
  useEffect(() => {
    handleChoices(value);
  }, [value]);
  const handleChoices = (value) => {
    let finalVariation = "";
    value.forEach((item) => (finalVariation += item.value.trim("")));
    let option = modalData?.[0]?.variations?.filter(
      (item) =>
        item.type.replaceAll("-", "").toLowerCase().trim() ===
        finalVariation.toLowerCase().trim()
    );
    if (choice && option.length > 0) {
      changeChoices(option[0], choice);
    }
  };
  return (
    <>
      {modalData[0].choice_options?.map((choice, choiceIndex) => (
        <Box key={choice.title} paddingLeft={{ xs: "10px", md: "0px" }}>
          <FoodTitleTypography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              margin: "5px 0",
              textAlign: "left",
            }}
          >
            {choice.title} :
          </FoodTitleTypography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={(e) => handleChange(e, choiceIndex, choice)}
              value={value[choiceIndex].value}
              // onChange={(e) =>
              //     handleChange(
              //         e,
              //         choice.title
              //     )
              // }
              //    onChange={() => changeChange(choice)}
              name="radio-buttons-group"
              sx={{
                marginLeft: "20px",
              }}
              defaultValue={
                modalData[0]?.variation?.length > 0
                  ? modalData[0]?.variation[0].value.type
                  : choice.options[0].replace(/\s/g, "")
              }
            >
              {choice.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={
                    <Radio
                    // onChange={() =>
                    //     handleChoiceOptions(choice)
                    // }
                    />
                  }
                  label={
                    <CustomTypographyLabel>{option}</CustomTypographyLabel>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
    </>
  );
};

VariationButtons.propTypes = {};

export default VariationButtons;
