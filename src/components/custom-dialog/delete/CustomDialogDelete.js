import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  CustomTypographyAlign,
  ImageContainer,
} from "../../../styled-components/CustomStyles.style";
import closeIcon from "../../../assets/images/icons/close.png";
import PropTypes from "prop-types";
import {
  CustomButtonCancel,
  CustomButtonWarning,
} from "../../../styled-components/CustomButtons.style";
import { CustomPaperForCustomDialogDelete } from "./CustomDialogDelete.style";

const CustomDialogDelete = (props) => {
  const { open, onClick, onClose, onSuccess } = props;

  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CustomPaperForCustomDialogDelete>
          <Stack alignItems="center" justifyContent="center">
            {/*<ImageContainer>*/}
            {/*    <img src={closeIcon} alt="closeIcon" />*/}
            {/*</ImageContainer>*/}
            <DialogTitle id="alert-dialog-title">
              <CustomTypographyAlign variant="h4" align="center">
                {t("Are Your Sure You Want to Delete This Zone ?")}
              </CustomTypographyAlign>
            </DialogTitle>
            <DialogContent>
              <CustomTypographyAlign variant="body1" align="center">
                <DialogContentText id="alert-dialog-description">
                  {t("This operation cannot be undone")}
                </DialogContentText>
              </CustomTypographyAlign>
            </DialogContent>
          </Stack>
          <DialogActions>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100%"
              spacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <CustomButtonCancel
                variant="contained"
                onClick={onClose}
                autoFocus
              >
                {t("No, Keep this ")}
              </CustomButtonCancel>
              <CustomButtonWarning variant="contained" onClick={onSuccess}>
                {t("Yes, Delete")}
              </CustomButtonWarning>
            </Stack>
          </DialogActions>
        </CustomPaperForCustomDialogDelete>
      </Dialog>
    </div>
  );
};
CustomDialogDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CustomDialogDelete;
