import React from "react";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";
import { alpha, Typography } from "@mui/material";
import { t } from "i18next";
import { useTheme } from "@emotion/react";
export const NoteStyledBox = styled(Stack)(({ theme }) => ({
  padding: "20px",
  backgroundColor: alpha(theme.palette.neutral[400], 0.2),
  borderRadius: "5px",
}));

const InstructionBox = ({ title, note }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth mt="1rem" spacing={2}>
      <Typography textTransform="capitalize" fontSize="16px" fontWeight="500">
        {t(title)}
      </Typography>
      <NoteStyledBox>
        <Typography fontSize="14px" color={theme.palette.neutral[400]}>
          {note}
        </Typography>
      </NoteStyledBox>
    </CustomStackFullWidth>
  );
};

export default InstructionBox;
