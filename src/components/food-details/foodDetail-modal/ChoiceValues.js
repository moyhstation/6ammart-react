import React, { useEffect, useState } from "react";
import { FoodTitleTypography } from "../food-card/FoodCard.style";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { Checkbox, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";

import VariationRequiredWarningAlert from "./VariationRequiredWarningAlert";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { CustomTypographyLabel } from "../../../styled-components/CustomTypographies.style";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";

export const ChoiceValues = (props) => {
  const { choice, t, radioCheckHandler, choiceIndex, changeChoices } = props;
  const [radioData, setRadioData] = useState({ isChecked: false });
  useEffect(() => {
    radioData?.option &&
      changeChoices(
        radioData.e,
        radioData.option,
        radioData.index,
        radioData.choiceIndex,
        radioData.choiceRequired,
        radioData.choiceType,
        radioData.isChecked
      );
  }, [radioData]);
  const handleRadioData = (
    e,
    option,
    index,
    choiceIndex,
    choiceRequired,
    choiceType
  ) => {
    if (radioData?.choiceIndex === choiceIndex && radioData?.index === index) {
      setRadioData({
        ...radioData,
        isChecked: !radioData.isChecked,
        e,
        option,
        index,
        choiceIndex,
        choiceRequired,
        choiceType,
      });
    } else {
      setRadioData({
        ...radioData,
        isChecked: true,
        e,
        option,
        index,
        choiceIndex,
        choiceRequired,
        choiceType,
      });
    }
  };

  return (
    <CustomStackFullWidth
      paddingLeft={{
        xs: "10px",
        md: "0px",
      }}
      paddingRight={{
        xs: "5px",
        md: "10px",
      }}
    >
      <FoodTitleTypography
        gutterBottom
        component="h6"
        sx={{
          margin: "5px 0",
          textAlign: "left",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {choice.name}{" "}
        {choice.required === "on" ? t("(required)") : t("(optional)")}:
      </FoodTitleTypography>
      <FormControl fullWidth>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          sx={{
            marginLeft: "20px",
            width: {
              xs: "90%",
              sm: "95%",
              md: "95%",
            },
          }}
        >
          {choice.values?.map((option, index) => (
            <CustomStackFullWidth
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                value={option.label}
                control={
                  choice?.type === "single" ? (
                    <Radio
                      checked={radioCheckHandler(choiceIndex, option, index)}
                      onClick={(e) =>
                        handleRadioData(
                          e,
                          option,
                          index,
                          choiceIndex,
                          choice.required,
                          choice?.type
                        )
                      }
                    />
                  ) : (
                    <Checkbox
                      defaultChecked={option?.isSelected}
                      onChange={(e) =>
                        changeChoices(
                          e,
                          option,
                          index,
                          choiceIndex,
                          choice.required,
                          choice?.type,
                          radioData.isChecked
                        )
                      }
                    />
                  )
                }
                label={
                  <CustomTypographyLabel>{option.label}</CustomTypographyLabel>
                }
              />
              <CustomTypographyLabel>
                {option.optionPrice === "0"
                  ? "free"
                  : `+${getAmountWithSign(option.optionPrice)}`}
              </CustomTypographyLabel>
            </CustomStackFullWidth>
          ))}
        </RadioGroup>
      </FormControl>
      {choice?.type === "multi" && (
        <VariationRequiredWarningAlert alertData={choice} type="info" t={t} />
      )}
    </CustomStackFullWidth>
  );
};
