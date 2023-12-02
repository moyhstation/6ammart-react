import toast from "react-hot-toast";
// import CustomAlert from '../alert/CustomAlert'
import { Paper, Stack } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import React from "react";

export const handleProductVariationRequirementsToaster = (
  text,
  checkingQuantity,
  t,
  id
) => {
  if (checkingQuantity) {
    toast.custom(
      () => (
        <Paper sx={{ padding: "10px" }}>
          <span>
            <Stack direction="row" alignItems="center" spacing={1}>
              <WarningAmberIcon color="warning" />
              <p
                style={{
                  paddingLeft: "0px",
                  paddingRight: "5px",
                }}
              >
                {t("Selected variation named")}{" "}
                <span style={{ fontWeight: "bold" }}>{text?.name}</span>{" "}
                {t("must be in between Minimum")}{" "}
                <span style={{ fontWeight: "bold" }}>{text?.min}</span>{" "}
                {t("and Maximum")}{" "}
                <span style={{ fontWeight: "bold" }}>{text?.max}</span>
              </p>
            </Stack>
          </span>
        </Paper>
      ),
      {
        id: "toast",
      }
    );
  } else {
    toast.custom(() => (
      <Paper sx={{ padding: "10px" }}>
        <span>
          <Stack direction="row" alignItems="center" spacing={1}>
            <WarningAmberIcon color="warning" />
            <p
              style={{
                paddingLeft: "0px",
                paddingRight: "5px",
              }}
            >
              {t("Variation")}{" "}
              <span style={{ fontWeight: "bold" }}> {text}</span>{" "}
              {t("can not remain without selection.")}
            </p>
          </Stack>
        </span>
      </Paper>
    ));
  }

  // <CustomAlert type="warning" text={text} />
};
