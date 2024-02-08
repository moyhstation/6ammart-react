import React from "react";
import { SaveButton } from "./basic-information/Profile.style";
import { ResetButton } from "./basic-information/BasicInformationForm";

const FormSubmitButton = ({ handleReset, isLoading, reset, submit }) => {
  return (
    <>
      <ResetButton variant="outlined" onClick={handleReset}>
        {reset}
      </ResetButton>
      <SaveButton
        // Fixing the syntax for applying marginTop on xs breakpoint
        variant="contained"
        type="submit"
        loading={isLoading}
      >
        {submit}
      </SaveButton>
    </>
  );
};

export default FormSubmitButton;
