import { Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomStackFullWidth } from "../src/styled-components/CustomStyles.style";
import FourHundred from "../src/components/errors-svg/FourHundred";

export default function Custom400() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { md: "5rem" },
        mb: { xs: "72px", md: "0" },
      }}
    >
      <CustomStackFullWidth
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Stack maxWidth="500px" width="100%" spacing={2} padding="1rem">
          <FourHundred />
          <Typography align="center" variant="h3">
            {t("something went wrong.")}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
    </Container>
  );
}
