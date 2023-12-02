// pages/500.js
import { Container, Stack, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../src/styled-components/CustomStyles.style";

import { useTranslation } from "react-i18next";
import FiveHundred from "../src/components/errors-svg/FiveHundred";

export default function Custom500() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { md: "9rem" },
        mb: { xs: "72px", md: "0" },
      }}
    >
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Stack maxWidth="500px" width="100%" spacing={2} padding="1rem">
          <FiveHundred />
          <Typography align="center" variant="h3">
            {t(
              "Internal server error. Please use registered valid domain and try again."
            )}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
    </Container>
  );
}
