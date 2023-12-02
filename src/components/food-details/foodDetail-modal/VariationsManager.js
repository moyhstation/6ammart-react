import React from "react";
import { FoodTitleTypography } from "../food-card/FoodCard.style";
import VariationButtons from "./VariationButtons";
import { ChoiceValues } from "./ChoiceValues";

const VariationsManager = (props) => {
  const { t, modalData, radioCheckHandler, changeChoices } = props;
  return (
    <>
      {modalData.length > 0 && modalData[0].food_variations?.length > 0 ? (
        modalData[0].food_variations?.map((choice, choiceIndex) => (
          <ChoiceValues
            key={choiceIndex}
            choice={choice}
            t={t}
            radioCheckHandler={radioCheckHandler}
            choiceIndex={choiceIndex}
            changeChoices={changeChoices}
          />
        ))
      ) : (
        <VariationButtons modalData={modalData} changeChoices={changeChoices} />
      )}
    </>
  );
};

VariationsManager.propTypes = {};

export default VariationsManager;
