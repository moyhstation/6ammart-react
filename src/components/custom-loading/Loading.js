import React from "react";
import { CircularProgress, Stack } from "@mui/material";
export default function Loading({ color }) {
  return (
    <Stack
      alignItems="center"
      style={{
        left: "50%",
      }}
    >
      <CircularProgress size="1rem" style={{ color: color }} />
    </Stack>
  );
}
